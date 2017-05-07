import React from 'react';
import PropTypes from 'prop-types';
import { merge } from './utils';

export default class Label extends React.Component {

  styles() {
    const offset = this.props.active ? { left: '20% '} : { right: '20%' };

    return merge({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
    }, offset);
  }

  render() {
    return (
      <span style={this.styles()} className="label">
      {this.props.active ? this.props.labels.on : this.props.labels.off }
      </span>
    );
  }
}


Label.propTypes = {
  active: PropTypes.bool,
  labels: PropTypes.shape({
    on: PropTypes.string,
    off: PropTypes.string
  })
};
