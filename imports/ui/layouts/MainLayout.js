import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'react-flexbox-grid';

import PublicNavigation from '../components/Navigations/PublicNavigation';


const MainLayout = ({ children }) => (
  <div className="main-container">
    <PublicNavigation />

    <Grid fluid>
      {children}
    </Grid>
  </div>
);


MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainLayout;
