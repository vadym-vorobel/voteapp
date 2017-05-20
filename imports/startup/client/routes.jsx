import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from '../../ui/layouts/MainLayout';

import HomePage from '../../ui/pages/HomePage';
import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={HomePage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
    </Route>
  </Router>
);
