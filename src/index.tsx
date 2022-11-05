import './assets/fonts/fonts.css';
import '../node_modules/modern-normalize/modern-normalize.css'
import './styles.sass';
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
