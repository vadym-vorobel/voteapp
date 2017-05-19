import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'react-toolbox/lib/layout';

import PublicNavigation from '../components/PublicNavigation';


class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <PublicNavigation />

        {this.props.children}
      </Layout>
    );
  }
}


MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainLayout;
