import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import Redirect from 'react-router/lib/Redirect';

import AppLayout from '../../ui/layouts/AppLayout';

import HomePage from '../../ui/pages/HomePage';
import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';
import NotFoundPage from '../../ui/pages/NotFoundPage';

import MyPollsPage from '../../ui/pages/MyPollsPage';


const publicRoutes = ['/', '/sign-in', 'sign-up'];
const commonRoutes = ['/not-found'];


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <IndexRoute component={HomePage} />
      <Route path="sign-in" component={SignInPage} />
      <Route path="sign-up" component={SignUpPage} />
      <Route path="not-found" component={NotFoundPage} />

      <Route path="my-polls" component={MyPollsPage} />

      <Redirect path="*" to="not-found" />
    </Route>
  </Router>
);
