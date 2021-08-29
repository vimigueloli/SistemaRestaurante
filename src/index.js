import React from 'react';
import ReactDOM from 'react-dom';
import Cliente  from './pages/cliente';
import { Provider } from 'react-redux';
import store from './components/store'
import './reset.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Cliente />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
