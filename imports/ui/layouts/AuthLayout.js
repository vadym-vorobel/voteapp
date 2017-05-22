import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'react-flexbox-grid';

import AuthNavigation from '../components/Navigations/AuthNavigation';


const AuthLayout = ({ children }) => (
  <div className="main-container">
    <AuthNavigation />

    <Grid fluid>
      {children}
    </Grid>
  </div>
);


AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default AuthLayout;
