import get from 'get-object-value';

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

  addLine(props) {
    const name = 'line-' + lineCounts;
    lineCounts++;
    this.host.setState(({lines}) => {
      lines[name] = {props};
      return {lines: {...lines}};
    });
    return name;
  }

  updateLine(name, params) {
    this.updateQueue[name] = {
      ...this.updateQueue[name],
      ...params,
    };
    this.clearTimeout();
    this.lineTimer = setTimeout(() => {
      this.host.setState(({lines}) => {
        keys(this.updateQueue).forEach(name => {
          if (get(lines, [name])) {
            lines[name] = {
              ...lines[name],
              ...this.updateQueue[name],
            };
          }
        });
        this.updateQueue = {};
        return {lines: {...lines}};
      });
    });
  }

  deleteLine(name) {
    this.clearTimeout();
    const payload = {};
    this.host.setState(
      ({lines}) => {
        const line = lines[name];
        if (line) {
          payload.line = line;
          const from = line.from;
          const to = line.to;
          if (from) {
            from.delLine(name);
            payload.from = from.getBoxGroupName();
          }
          if (to) {
            to.delLine(name);
            payload.to = to.getBoxGroupName();
          }
          if (from && to) {
            const {mergeId, invertMergeId} = this.getConnectIds(from, to);
            delete this.connects[mergeId];
            delete this.connects[invertMergeId];
          }
          delete lines[name];
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
      const lineName = conns[key];
      const {from, to} = lines[lineName];
      if (!from || !to) {
        return;
      } else {
        const connData = this.getConnectNames(from, to);
        connData.name = lineName;
        results.push(connData);
      }
    });
    return results;
  }

  addConnected(lineName, from, to) {
    const {fromBoxId, toBoxId, mergeId, invertMergeId} = this.getConnectIds(
      from,
      to,
    );
    const connects = this.connects;
    if (!get(connects, [mergeId]) && !get(connects, [invertMergeId])) {
      const host = this.host;
      const payload = {
        from,
        to,
        start: from.getCenter(),
        end: to.getCenter(),
      };
      const isContinue = host.handleConnWillAdd({...payload, lineName});
      if (isContinue) {
        connects[mergeId] = lineName;
        from.setLine(lineName, 'from');
        to.setLine(lineName, 'to');
        this.updateLine(lineName, payload);
        host.handleConnAdd({...payload, lineName});
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
