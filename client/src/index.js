import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);