import React from 'react';
import { AppRegistry } from 'react-native';
import App from './_layout';
import { name as appName } from '../app.json';

const Main = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => Main);