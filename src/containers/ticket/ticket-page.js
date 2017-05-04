import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/lottery';
import ProgressButton from 'react-progress-button';
import './ticket-page.css';
import 'progress_css';

@connect(mapStateToProps, mapDispatchToProps)
export default class TicketPage extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        generateState: PropTypes.shape({
            isPending: PropTypes.bool.isRequired,
            success: PropTypes.string,
            error: PropTypes.string
        }).isRequired,
        ticketState: PropTypes.shape({
            isPending: PropTypes.bool.isRequired,
            ticket: PropTypes.array,
            error: PropTypes.string
        }).isRequired,
    };

    componentDidMount() {
        const {actions} = this.props;
        actions.load();
    };

    render() {
        const {ticketState, actions} = this.props;

        const {ticket, isPending, error} = ticketState;

        let content;

        if (isPending) {
            content = TicketPage.renderProgress()
        } else if (error) {
            content = TicketPage.renderError(error);
        } else if (ticket) {
            content = TicketPage.renderTicket(ticket);
        }

        return (
            <div>
                {content}

                <div className='ticket_generate_container'>
                    <ProgressButton
                        onClick={() => actions.generate(actions) }
                        state={this.progressButtonState()}>
                        Generate
                    </ProgressButton>
                </div>
            </div>
        );
    };

    progressButtonState() {
        const {isPending, success, error} = this.props.generateState;

        if (isPending) {
            return 'loading';
        } else if (error) {
            return 'error';
        } else if (success) {
            return 'success';
        } else {
            return '';
        }
    };

    static renderTicket(ticket) {
        return (
            <div className='ticket'>
                {ticket.join(' ')}
            </div>
        );
    };

    static renderError(error) {
        return (
            <div className='ticket'>
                {error}
            </div>
        );
    };

    static renderProgress() {
        return (
            <div className='ticket'>
                Progress...
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        generateState: state.generate,
        ticketState: state.ticket
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}
