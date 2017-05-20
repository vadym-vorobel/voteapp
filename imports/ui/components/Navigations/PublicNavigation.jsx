import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

import NavButton from './NavButton';


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
