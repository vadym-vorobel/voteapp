import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'react-flexbox-grid';

import PublicNavigation from '../components/PublicNavigation';


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
      </div>
    );
  }
}


MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainLayout;
