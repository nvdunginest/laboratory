import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import history from './configs/history';
import theme from './configs/theme';

library.add(fas, far, fab);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
serviceWorkerRegistration.register();

reportWebVitals();
