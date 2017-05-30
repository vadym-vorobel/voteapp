import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const HOMEPAGE_PATH = '/my-polls';


const isCurrentLocationHomePage = router => router.location.pathname === HOMEPAGE_PATH;

const getToolbarNavIcon = router =>
  (isCurrentLocationHomePage(router) ? 'thumbs_up_down' : 'arrow_back');

const getToolbarNavAction = router =>
  (isCurrentLocationHomePage(router) ? true : router.goBack());


const getNavButton = (router) => (
  <LinkButton
    icon
    onClick={() => getToolbarNavAction(router)}
  >
    {getToolbarNavIcon(router)}
  </LinkButton>
);


const logout = () => Meteor.logout();

const actions = [
  <LinkButton flat to={HOMEPAGE_PATH} label="My Polls" />,
  <LinkButton flat to="/public-polls" label="Public Polls" />,
  <LinkButton flat label="Logout" onClick={logout} />,
];


class AuthNavigation extends React.Component {
  render() {
    return (
      <Toolbar
        colored
        title="Vote App"
        nav={getNavButton(this.context.router)}
        actions={actions}
      />
    );
  }
}


AuthNavigation.contextTypes = {
  router: PropTypes.object.isRequired,
};


export default AuthNavigation;
