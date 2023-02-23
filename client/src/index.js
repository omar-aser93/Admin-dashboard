import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'           //import redux provider & wrap it around the App compnent
import { store } from "./redux/store";           //import store from the store file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <Provider store={store}> <App /> </Provider> );

