import get from 'get-object-value';
import {removeEmpty} from 'array.merge';

let lineCounts = 0;
const keys = Object.keys;

class ConnectController {
  lineTimer = null;
  connects = {};
  updateQueue = {};
  host = null;

  constructor(props) {
    this.host = props.host;
  }

  getLine(id) {
    return get(this, ['host', 'state', 'lines', id]);
  }

  addLine(props) {
    const id = 'line-' + lineCounts;
    lineCounts++;
    this.host.setState(({lines}) => {
      lines[id] = {props};
      return {lines: {...lines}};
    });
    return id;
  }

  updateLine(id, params) {
    this.clearTimeout();
    this.updateQueue[id] = {
      ...this.updateQueue[id],
      ...params,
    };
    this.lineTimer = setTimeout(() => {
      this.host.setState(({lines}) => {
        keys(this.updateQueue).forEach(lineId => {
          if (get(lines, [lineId])) {
            lines[lineId] = {
              ...lines[lineId],
              ...this.updateQueue[lineId],
            };
          }
        });
        this.updateQueue = {};
        return {lines: {...lines}};
      });
    }, 1);
  }

  deleteLine(id) {
    this.clearTimeout();
    const payload = {};
    this.host.setState(
      ({lines}) => {
        const line = lines[id];
        if (line) {
          payload.line = line;
          const from = line.from;
          const to = line.to;
          if (from) {
            from.delLine(id);
            payload.from = from.getBoxGroupName();
          }
          if (to) {
            to.delLine(id);
            payload.to = to.getBoxGroupName();
          }
          if (from && to) {
            const {mergeId, invertMergeId} = this.getConnectIds(from, to);
            delete this.connects[mergeId];
            delete this.connects[invertMergeId];
          }
          delete lines[id];
        }
        return {lines: {...lines}};
      },
      () => {
        const {from, to} = payload;
        if (from || to) {
          this.host.handleLineDel(payload);
        }
      },
    );
  }

  getConnectIds(from, to) {
    const fromBoxId = from.getBox().getId();
    const toBoxId = to.getBox().getId();
    const mergeId = `${fromBoxId}-${toBoxId}`;
    const invertMergeId = `${toBoxId}-${fromBoxId}`;
    return {
      fromBoxId,
      toBoxId,
      mergeId,
      invertMergeId,
    };
  }

  getConnectNames(from, to) {
    const ids = this.getConnectIds(from, to);
    const fromBox = from.getBox();
    const toBox = to.getBox();
    const fromBoxGroup = fromBox.getBoxGroup();
    const toBoxGroup = toBox.getBoxGroup();
    const fromBoxName = fromBox.getName();
    const fromBoxGroupName = fromBoxGroup.getName();
    const toBoxName = toBox.getName();
    const toBoxGroupName = toBoxGroup.getName();
    return {
      ...ids,
      fromBoxName,
      toBoxName,
      fromBoxGroupName,
      toBoxGroupName,
    };
  }

  getConnects() {
    const conns = this.connects;
    const {lines} = this.host.state;
    const results = [];
    keys(conns).forEach(key => {
      const lineId = conns[key];
      const {from, to} = lines[lineId];
      if (!from || !to) {
        return;
      } else {
        const connData = this.getConnectNames(from, to);
        connData.id = lineId;
        results.push(connData);
      }
    });
    return results;
  }

  addConnected(lineId, from, to, init) {
    const {fromBoxId, toBoxId, mergeId, invertMergeId} = this.getConnectIds(
      from,
      to,
    );
    const connects = this.connects;
    if (
      !get(connects, [mergeId]) &&
      !get(connects, [invertMergeId]) &&
      fromBoxId !== toBoxId
    ) {
      const host = this.host;
      const payload = removeEmpty({
        from,
        to,
        init,
        start: from.getCenter(),
        end: to.getCenter(),
      });
      const isContinue = host.handleConnWillAdd({...payload, lineId});
      if (isContinue) {
        connects[mergeId] = lineId;
        from.setLine(lineId, 'from');
        to.setLine(lineId, 'to');
        this.updateLine(lineId, payload);
        host.handleConnAdd({...payload, lineId});
      }
      return isContinue;
    } else {
      return false;
    }
  }

  clearTimeout() {
    if (this.lineTimer) {
      clearTimeout(this.lineTimer);
      this.lineTimer = false;
    }
  }
}

export default ConnectController;
