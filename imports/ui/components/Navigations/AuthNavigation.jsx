import React from 'react';

import { Meteor } from 'meteor/meteor';

import Toolbar from 'react-md/lib/Toolbars';

import NavButton from './NavButton';


const navButton = (
  <NavButton icon iconName="thumbs_up_down" to="/my-polls"/>
);


const logout = () => Meteor.logout();

const actions = [
  <NavButton flat to="/my-polls" label="My Polls" />,
  <NavButton flat label="Logout" onClick={logout}/>,
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
