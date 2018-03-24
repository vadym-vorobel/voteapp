import React from 'react';

import Link from 'react-router/lib/Link';

import { Meteor } from 'meteor/meteor';

import { Toolbar, MenuButton, ListItem } from 'react-md';

import LinkButton from '../LinkButton';

import './AuthNavigation.less';

const navButton = (
  <LinkButton icon to="/my-polls">
    thumbs_up_down
  </LinkButton>
);

const logout = () => Meteor.logout();

const actions = [
  <Link key="my-polls-action" to="/my-polls">
    <ListItem primaryText="My Polls" />
  </Link>,
  <Link key="public-polls-action" to="/public-polls">
    <ListItem primaryText="Public Polls" />
  </Link>,
  <ListItem key="logout-action" primaryText="Logout" onClick={logout} />,
];

const KebabMenu = () => (
  <MenuButton icon id="auth-menu" menuItems={actions}>
    more_vert
  </MenuButton>
);

const AuthNavigation = () => (
  <Toolbar
    colored
    title="Vote App"
    nav={navButton}
    actions={<KebabMenu />}
    className="auth-menu-container"
  />
);

export default AuthNavigation;
