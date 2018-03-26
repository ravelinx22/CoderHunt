import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from "../imports/startup/client/routes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
