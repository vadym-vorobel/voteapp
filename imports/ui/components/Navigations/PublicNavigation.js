import React from 'react';

import Toolbar from 'react-md/lib/Toolbars';

import LinkButton from '../LinkButton';


const navButton = (
  <LinkButton icon to="/">thumbs_up_down</LinkButton>
);

const actions = [
  <LinkButton flat to="/sign-in" label="Sign In" />,
  <LinkButton flat to="/sign-up" label="Sign Up" />,
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
