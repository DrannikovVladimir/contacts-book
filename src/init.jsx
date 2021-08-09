import React from 'react';
import { Provider } from 'react-redux';

import store from './app/store.js';
import App from './components/App.jsx';

const init = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
