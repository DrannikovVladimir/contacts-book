import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/locales.js';
import store from './app/store.js';
import App from './components/App.jsx';

const init = async () => {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      debug: true,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
