import * as React from 'react';

import { useColorScheme } from 'react-native';

import RootNavigation from './src/Navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import { useState } from 'react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
