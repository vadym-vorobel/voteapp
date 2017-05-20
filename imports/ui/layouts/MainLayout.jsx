import React from 'react';
import PropTypes from 'prop-types';

import PublicNavigation from '../components/PublicNavigation';


class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <PublicNavigation />

        {this.props.children}
      </div>
    );
  }
}


MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainLayout;
