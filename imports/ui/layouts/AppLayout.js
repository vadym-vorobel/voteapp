import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Grid } from 'react-flexbox-grid';

import Spinner from '../components/Spinner';
import AuthNavigation from '../components/Navigations/AuthNavigation';
import PublicNavigation from '../components/Navigations/PublicNavigation';


const ALERTS_LIMIT = 3;


const isCurrentRouteOneOf = (router, routes) => routes.some(publicRoute => router.isActive({
  pathname: publicRoute,
}, true));

const redirectTo = (pathname, router) => {
  if (!router.isActive(pathname, true)) {
    router.push(pathname);
  }
};


class AppLayout extends React.Component {
  componentDidMount() {
    this.checkAuthRoutes(this.props);
  }

  componentWillUpdate(nextProps) {
    this.checkAuthRoutes(nextProps);
  }

  checkAuthRoutes(newProps) {
    const { router, route, isLoggedIn, loading } = newProps;
    const { publicRoutes, commonRoutes } = route;

    const isCommonRoute = isCurrentRouteOneOf(router, commonRoutes);

    if (!isCommonRoute) {
      const isPublicRoute = isCurrentRouteOneOf(router, publicRoutes);

      if (isPublicRoute && isLoggedIn) {
        redirectTo('/my-polls', router);
      } else if (!isPublicRoute && !isLoggedIn && !loading) {
        redirectTo('/', router);
      }
    }
  }

  render() {
    const { loading, children, isLoggedIn } = this.props;

    return (
      <Spinner loading={loading}>
        {isLoggedIn ? <AuthNavigation /> : <PublicNavigation />}

        <Grid fluid className="m-t-20">
          {!loading && children}
        </Grid>

        <Alert stack={{ limit: ALERTS_LIMIT }} />
      </Spinner>
    );
  }
}


AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};


AppLayout.contextProps = {
  router: PropTypes.func.isRequired,
};


export default createContainer(() => {
  const subsHandler = Meteor.subscribe('users.current');

  return {
    loading: !subsHandler.ready() || Meteor.loggingIn(),
    isLoggedIn: !!Meteor.user(),
  };
}, AppLayout);
