import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../components/LoginPage';
import ChatScreenPage from '../components/ChatScreenPage';
import JoinChat from '../components/JoinChat';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();
// We do this so that we can use history in app.js because app.js
// is not a route and so we could not do this earlier.
// We also hence change to Router from BrowserRouter and pass in the history prop
// BrowserRouter had history built in.

const AppRouter = () => (
  // <Router history={history}>
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={JoinChat} exact={true} />
        <Route path="/chatscreen" component={ChatScreenPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
