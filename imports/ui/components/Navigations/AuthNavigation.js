import React from 'react';

import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const navButton = (
  <LinkButton icon to="/my-polls">thumbs_up_down</LinkButton>
);


const logout = () => Meteor.logout();

const actions = [
  <LinkButton flat to="/my-polls" label="My Polls" />,
  <LinkButton flat to="/public-polls" label="Public Polls" />,
  <LinkButton flat label="Logout" onClick={logout} />,
];


const AuthNavigation = () => (
  <Toolbar
    colored
    title="Vote App"
    nav={navButton}
    actions={actions}
  />
);


export default AuthNavigation;
