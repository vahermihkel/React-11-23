import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './css/index.css';
import App from './App';
import reportWebVitals from './util/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import { CartSumContextProvider } from './store/CartSumContext';
import { AuthContextProvider } from './store/AuthContext';
import { Provider } from 'react-redux';
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
    <BrowserRouter>
        <CartSumContextProvider>
          <AuthContextProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AuthContextProvider>
        </CartSumContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
