var React = require('react');
var Image = require('../molecules/image.jsx');
var mixClass = require('classnames');


module.exports  = React.createClass({
  displayName: 'CDN',
  render: function() {
    var link = this.props.src.replace(/^(http|https):\/\//gi,'');
    var src = '//i2.wp.com/'+link;
    return (
      <Image {...this.props} src={src} />
    );
  }

});
