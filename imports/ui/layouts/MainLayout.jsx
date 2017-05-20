import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

import { Grid } from 'react-flexbox-grid';

import PublicNavigation from '../components/PublicNavigation';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <PublicNavigation />

        <Grid fluid>
          {this.props.children}
        </Grid>

        <Alert />
      </div>
    );
  }
}


MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainLayout;
