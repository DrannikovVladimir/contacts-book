// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/style.scss';
import '../assets/toast/main.scss';
import { render } from 'react-dom';

import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'contacts:*';
}

render(
  init(),
  document.querySelector('#root'),
);
