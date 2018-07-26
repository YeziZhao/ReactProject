import React , { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl-context';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import logo from 'assets/logo.svg';
import { bindActionCreators } from 'redux';
import actions from './actions';
import './index.scss';
import { 
    Input, 
    Icon, 
    Button 
} from 'antd';

const propTypes = {
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    prefixCls: PropTypes.string
};

const defaultProps = {
    prefixCls: 'view-Outlets',
};

class Outlets extends Component {

    render() {
        return (<div>Outlets</div>)
    }
}

const mapStateToProps = state => {
    return {

    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(Outlets)));