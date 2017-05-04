import {createAction} from 'redux-actions';
import {LOAD_ACCOUNT, GENERATE_TICKET, LOAD_TICKET} from '../constants';
import {getAccount, generateTicket, loadTicket} from '../services/lottery';

export const loadAccount = createAction(LOAD_ACCOUNT, getAccount);
export const generate = createAction(GENERATE_TICKET, generateTicket);
export const load = createAction(LOAD_TICKET, loadTicket);
