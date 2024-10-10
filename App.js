import React from 'react';
import Home from './src/screen/Home';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();

const App = () => {
  const Root = Home;
  return (
    <>
      <Root />
    </>
  );
};

export default App;
