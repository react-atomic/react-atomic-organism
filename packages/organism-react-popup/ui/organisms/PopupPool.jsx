import React from 'react';
import {build, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';
import Return from 'reshow-return';

import popupStore from '../../src/stores/popupStore';

const keys = Object.keys;

const getPops = nodes => {
  nodes = get(nodes) || {};
  const pops = [];
  keys(nodes).map(key => {
    const node = nodes[key];
    const nodeProps = get(node, ['props'], {});
    const toPool = nodeProps.toPool;
    if ((name || toPool) && toPool !== name) {
      return;
    }
    pops.push(build(node)({key}));
  });
  return pops;
};

const PopupPool = ({name, component, ...otherProps}) => {
  return (
    <Return stores={[popupStore]} initStates={['nodes']}>
      {({nodes}) => {
        const pops = getPops(nodes);
        if (pops.length) {
          return build(component)(
            {
              className: 'popup-pool',
              ui: false,
              ...otherProps,
            },
            pops,
          );
        } else {
          return null;
        }
      }}
    </Return>
  );
};

PopupPool.defaultProps = {
    component: SemanticUI,
};

export default PopupPool;
