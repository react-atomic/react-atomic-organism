import get from "get-object-value";
import { removeEmpty } from "array.merge";

let lineCounts = 1;
const keys = Object.keys;

class ConnectController {
  lineTimer = null;
  connects = {};
  queue = null;
  updateCbQueue = [];
  host = null;

  constructor(props) {
    this.host = props.host;
  }

  getLine(id) {
    return get(this, ["host", "state", "lines", id]);
  }

  addLine(props) {
    const id = "line-" + lineCounts;
    lineCounts++;
    this.setState((lines) => {
      lines[id] = { props };
      return lines;
    });
    return id;
  }

  updateLine(id, params) {
    this.setState((lines) => {
      lines[id] = {
        ...lines[id],
        ...params,
      };
      return lines;
    });
  }

  deleteLine(id) {
    const payload = {};
    this.setState((lines) => {
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
          const { mergeId, invertMergeId } = this.getConnectIds(from, to);
          delete this.connects[mergeId];
          delete this.connects[invertMergeId];
        }
        delete lines[id];
      }
      return lines;
    });
  }

  getConnectIds(from, to) {
    if (!from || !to) {
      console.warn("Can not get point type for 'from' or 'to'.", {from, to});
      return {};
    }
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
    const fromBoxGroupId = fromBoxGroup.getId();
    const toBoxName = toBox.getName();
    const toBoxGroupName = toBoxGroup.getName();
    const toBoxGroupId = toBoxGroup.getId();
    return {
      ...ids,
      fromBoxName,
      toBoxName,
      fromBoxGroupName,
      toBoxGroupName,
      fromBoxGroupId,
      toBoxGroupId,
    };
  }

  getConnects() {
    const conns = this.connects;
    const { lines } = this.host.state;
    const results = [];
    keys(conns).forEach((key) => {
      const lineId = conns[key];
      const { from, to } = lines[lineId];
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
    const { fromBoxId, toBoxId, mergeId, invertMergeId } = this.getConnectIds(
      from,
      to
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
      const isContinue = host.handleConnWillAdd({ ...payload, lineId });
      if (isContinue) {
        connects[mergeId] = lineId;
        from.setLine(lineId, "from");
        to.setLine(lineId, "to");
        this.updateLine(lineId, payload);
        host.handleConnAdd({ ...payload, lineId });
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

  setState(callback, updateCb, delay) {
    this.clearTimeout();
    if (!delay) {
      delay = 1;
    }
    if (!this.queue) {
      this.queue = this.host.getLines();
    }
    if (callback) {
      this.queue = callback(this.queue);
    }
    if (updateCb) {
      this.updateCbQueue.push(updateCb);
    }
    if (!this.host.oConn) {
      return;
    }
    this.lineTimer = setTimeout(() => {
      const host = this.host;
      host.mount && host.setState({ lines: { ...this.queue } }, () => {
        this.queue = null;
        this.updateCbQueue.forEach((cb) => cb());
        this.updateCbQueue = [];
      });
    }, delay);
  }

  getUniqueFromTo() {
    const conns = this.getConnects();
    const connsMap = {};
    const addBySort = (from, to) => {
      const a = [from, to].sort();
      connsMap[a[0] + "-" + a[1]] = [from, to];
    };
    conns.forEach((conn) => {
      addBySort(conn.fromBoxGroupId, conn.toBoxGroupId);
    });
    return connsMap;
  }
}

export default ConnectController;
