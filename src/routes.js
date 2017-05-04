import React from 'react';
import {Route, IndexRoute} from 'react-router';
import TicketPage from './containers/ticket/ticket-page';
import Application from './containers/application';

export default (
    <Route path='/' component={ Application }>
        <IndexRoute component={ TicketPage }/>
    </Route>
);
