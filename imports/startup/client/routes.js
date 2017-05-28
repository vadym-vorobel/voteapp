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
import PublicPollsPage from '../../ui/pages/PublicPollsPage';
import EditPollPage from '../../ui/pages/EditPollPage';
import PollPage from '../../ui/pages/PollPage';


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
      <Route path="public-polls" component={PublicPollsPage} />

      <Route path="edit-poll/:_id" component={EditPollPage} />
      <Route path="poll/:_id" component={PollPage} />

      <Redirect path="*" to="not-found" />
    </Route>
  </Router>
);
