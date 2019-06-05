import React, {PureComponent} from 'react';
import {Group, Circle} from 'organism-react-graph';
import CancelIcon from '../molecules/CancelIcon';

class CancelButton extends PureComponent {
  static defaultProps = {show: true};

  state = {r: 0};

  handleEl = el => (this.el = el);

  componentDidMount() {
    const el = this.el;
    const bbox = el.getBBox();
    const {width} = bbox;
    if (width) {
      this.setState({r: width / 2});
    }
  }

  render() {
    const {x, y, style, onClick, show} = this.props;
    const {r} = this.state;
    let thisCircle = null;
    if (r) {
      thisCircle = (
        <Circle r={r + 1} cx={r + 2} cy={r + 2} fill="transparent" />
      );
    }
    let thisStyle = {...Styles.container, ...style};
    if (!show) {
      thisStyle = {
        ...thisStyle,
        ...Styles.hide,
      };
    }
    const translate = `translate(${x - r}, ${y - r})`;
    return (
      <Group
        className="cance-button"
        refCb={this.handleEl}
        style={thisStyle}
        transform={translate}
        onClick={onClick}>
        <CancelIcon style={Styles.cancel} transform="scale(0.8)" />
        {thisCircle}
      </Group>
    );
  }
}

export default CancelButton;

const Styles = {
  container: {
    cursor: 'pointer',
  },
  cancel: {
    fill: '#f00',
  },
  circle: {
    strokeLinejoin: 'round',
    strokeWidth: 15,
    strokeOpacity: 1,
    fill: 'none',
  },
  hide: {
    opacity: 0,
  },
};
