import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import account from './account';
import generate from './generate';
import ticket from './ticket';

export default combineReducers({
    account,
    generate,
    ticket,
    routing
});
