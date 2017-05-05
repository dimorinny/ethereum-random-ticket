import typeToReducer from 'type-to-reducer';
import {LOAD_TICKET} from '../constants';

const TICKET_DEFAULT_STATE = {
    isPending: false,
    ticket: null,
    error: null
};

export default typeToReducer({
    [LOAD_TICKET]: {
        PENDING: (state, action) => ({
            ...state,
            isPending: true,
            error: null,
            success: null
        }),
        REJECTED: (state, action) => ({
            ...state,
            isPending: false,
            error: 'You don\'t have a ticket',
            ticket: null
        }),
        FULFILLED: (state, action) => ({
            ...state,
            isPending: false,
            error: null,
            ticket: action.payload
        })
    }
}, TICKET_DEFAULT_STATE);
