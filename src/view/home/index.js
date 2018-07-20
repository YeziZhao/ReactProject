import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from 'assets/logo.svg';
import * as actions from './action';
import './style.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getMessageSuccess();
  }

  render() {
    const { message } = this.props;
    console.log(message, '-------------------')
    return (
      <div className="home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">
            <h1 className="App-title">
              Welcome to React
            </h1>
          </Link>
        </header>
        <p className="App-intro">
          To get started, edit
          <code className="App-code">
            src/views/home/index.js
          </code>
          and save to reload.
        </p>
        <Link to="/user" href="/user">
          <p className="App-intro">
            {message}
          </p>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.home.message,
});

// const mapDispatchToProps = {
//     actions: actions
// };
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
