import React from 'react';
import ReactDOM from 'react-dom';
import Cliente  from './pages/cliente';
import { Provider } from 'react-redux';
import store from './components/store'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const client = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_CARDAPIO}`,
  }
});



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ClientContext.Provider value={client}>
        <Cliente />
      </ClientContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
