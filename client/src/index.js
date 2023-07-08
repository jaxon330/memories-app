import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';


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
  <GoogleOAuthProvider clientId='531682415264-hr41pguvupn9gug1goj4u3avusqpmrtd.apps.googleusercontent.com' >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);