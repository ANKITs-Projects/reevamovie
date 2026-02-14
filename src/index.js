import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from "./store/store";
import reportWebVitals from './reportWebVitals';

/** * Set up axios global defaults. 
 * Ensure the Bearer token is valid and the baseURL is secure.
 */
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGVkNzI5NTQ3NTBjMDk3NWZlOTQ0MTExYmFkOTJmYiIsIm5iZiI6MTczMjk1NjcyNC41NCwic3ViIjoiNjc0YWQyMzQ2OGE2MDNiMDZhMzkzMzJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.jPnqxGeONl3GslF8tyPj8k55e7nSCv2rZq8OsHX5eDs`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();