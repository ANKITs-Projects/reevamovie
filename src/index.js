import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import axios from 'axios';
import { Provider } from 'react-redux';
import {store} from "./store/store"


/** set up axios */
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] =`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGVkNzI5NTQ3NTBjMDk3NWZlOTQ0MTExYmFkOTJmYiIsIm5iZiI6MTczMjk1NjcyNC41NCwic3ViIjoiNjc0YWQyMzQ2OGE2MDNiMDZhMzkzMzJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.jPnqxGeONl3GslF8tyPj8k55e7nSCv2rZq8OsHX5eDs`
// axios.defaults.headers.common['Authorization'] ="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGVkNzI5NTQ3NTBjMDk3NWZlOTQ0MTExYmFkOTJmYiIsIm5iZiI6MTczMjk1NjcyNC41NCwic3ViIjoiNjc0YWQyMzQ2OGE2MDNiMDZhMzkzMzJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.jPnqxGeONl3GslF8tyPj8k55e7nSCv2rZq8OsHX5eDs"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
     
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
