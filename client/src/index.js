import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
