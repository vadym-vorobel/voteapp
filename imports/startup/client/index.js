import React from 'react';
import { render } from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { renderRoutes } from './routes';


Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app-container'));
});
