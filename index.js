import React from 'react';
import { registerRootComponent } from 'expo';

import { Provider } from 'react-redux';
import { store } from './src/store';

import App from './App';

const ReduxProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
registerRootComponent(ReduxProvider);
