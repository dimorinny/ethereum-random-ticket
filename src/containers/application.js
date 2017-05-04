import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/lottery';
import './application.css';

@connect(mapStateToProps, mapDispatchToProps)
export default class Application extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
        accountState: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {actions} = this.props;
        actions.loadAccount();
    };

    render() {
        const {accountState} = this.props;
        const {error, isPending} = accountState;

        let content;

        if (error != null) {
            content = Application.renderError();
        } else if (isPending) {
            content = Application.renderProgress();
        } else {
            content = this.renderContent();
        }

        return (
            <div>
                {content}
            </div>
        );
    };

    renderContent() {
        const {children} = this.props;

        return (
            <div>
                { children }
            </div>
        );
    };

    static renderProgress() {
        return (
            <div>
                Progress...
            </div>
        );
    };

    static renderError() {
        const metamask = <a href='https://github.com/MetaMask'>Metamask</a>;
        const mist = <a href='https://github.com/ethereum/mist'>Mist</a>;

        return (
            <div>
                <h2>Error load your account:</h2>
                <h4>
                    Use static {metamask} or {mist} projects for authorization in blockchain.
                </h4>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        accountState: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}
