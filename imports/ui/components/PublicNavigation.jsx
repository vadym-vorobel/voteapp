import React from 'react';

import { Toolbar, FontIcon } from 'react-md';

import NavButton from './NavButton';

import './PublicNavigation.less';


const navButton = (
  <NavButton icon iconName="thumbs_up_down" to="/"/>
);

const actions = [
  <NavButton flat to="/sign-in" label="Sign In" />,
  <NavButton flat to="/sign-up" label="Sign Up" />
];


const PublicNavigation = () => (
  <Toolbar
    colored
    title="Vote App"
    nav={navButton}
    actions={actions}
  />
);


export default PublicNavigation;
