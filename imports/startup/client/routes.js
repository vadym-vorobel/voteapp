import React from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';

import MainLayout from '../../ui/layouts/MainLayout';
import AuthLayout from '../../ui/layouts/AuthLayout';

import App from '../../ui/pages/App';
import NotFoundPage from '../../ui/pages/NotFoundPage';

import HomePage from '../../ui/pages/HomePage';
import SignInPage from '../../ui/pages/SignInPage';
import SignUpPage from '../../ui/pages/SignUpPage';

import MyPolls from '../../ui/pages/MyPolls';


const publicRoutes = ['/', '/sign-in', 'sign-up'];
const commonRoutes = ['/not-found'];


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={App} publicRoutes={publicRoutes} commonRoutes={commonRoutes}>
      <Route component={MainLayout}>
        <Route path="/" component={HomePage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-up" component={SignUpPage} />
      </Route>

      <Route component={AuthLayout}>
        <Route path="/my-polls" component={MyPolls} />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
