import React, { Component } from 'react';
import './normalLayout.scss';

class NormalLayout extends Component {
  render() {
    return (
      <div className="normalLayout">
        {this.props.children}
      </div>
    );
  }
}

export default NormalLayout;