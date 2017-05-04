import typeToReducer from 'type-to-reducer';
import {GENERATE_TICKET} from '../constants';

const TICKET_GENERATE_DEFAULT_STATE = {
    isPending: false,
    success: null,
    error: null
};

export default typeToReducer({
    [GENERATE_TICKET]: {
        PENDING: (state, action) => ({
            ...state,
            isPending: true,
            error: null,
            success: null
        }),
        REJECTED: (state, action) => ({
            ...state,
            isPending: false,
            error: 'Send coin error',
            success: null
        }),
        FULFILLED: (state, action) => ({
            ...state,
            isPending: false,
            error: null,
            success: 'Success'
        })
    }
}, TICKET_GENERATE_DEFAULT_STATE);
