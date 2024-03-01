import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store, persistor} from './redux/store';
import { Provider } from 'react-redux';
import "./styles/App.css";
import MyRouter from './routes';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <MyRouter />
    </React.StrictMode>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();