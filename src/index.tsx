import './assets/fonts/fonts.css';
import './utils/modern-normalize.css'
import './styles.sass';
import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { fetchObjects, ObjectProps } from './api/fetchObjects';
import store from './utils/Store';

/* Mobile viewport height hack */
let timeoutId: NodeJS.Timeout | null = null;
const documentHeight = () => {
  if(timeoutId) clearTimeout(timeoutId); // avoid execution of previous timeouts
  timeoutId = setTimeout(() => {
   const doc = document.documentElement;
   doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
  }, 200);
};
documentHeight();
window.addEventListener('resize', documentHeight);

for(let i = 1; i <= 9; i++) {
  const mockupObject: ObjectProps = {
    name: '',
    brand: '',
    price: '',
    category: '',
    description: '',
    additionalInfo: '',
    url: '',
    urlText: '',
    altText: '',
    mainImage: '',
    previewImage: ''
  }
  store.set(`objects.${i}`, mockupObject);
}

fetchObjects();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);

