import React, {PureComponent} from 'react';

class BaseBoxComponent extends PureComponent {
  getEl() {
    console.error('You need implement getEl()');
  }
}

export default BaseBoxComponent;
