import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from '../../ui/layouts/MainLayout';

import HomePage from '../../ui/pages/HomePage';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={HomePage} />
    </Route>
  </Router>
);
