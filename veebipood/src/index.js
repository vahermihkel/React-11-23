import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// route-miseks (navigeerimiseks) peame tegema:
// 1. npm install react-router-dom <--- lisab node_modules kausta navigeerimiseks vajalikud failid
// 2. lisame BrowserRouter impordi
// 3. paneme BrowserRouter tagi ümber App tagi
// 4. App.js failis loome URLi ja HTMLi seoseid

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


