import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './component/Login/Login';
import Mainpage from './component/MainPage/Mainpage';
import Alice from './component/Alice/Alice';
import Details from './component/Details/Details';
import TransactionViewer from './component/TransactionViewer/TransactionViewer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isLogin = sessionStorage.getItem('login');
const logIn = process.env.REACT_APP_LOGIN;
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: 'admin',
    element: isLogin == (logIn) ? <Mainpage /> : <Navigate replace to="/" />,
  },
  {
    path: 'add-alice',
    element: isLogin == (logIn) ? <Alice /> : <Navigate replace to="/" />,
  }
  ,
  {
    path: 'alice-details',
    element: isLogin == (logIn) ? <Details /> : <Navigate replace to="/" />,
  }
  ,
  {
    path: 'details',
    element: isLogin == (logIn) ? <TransactionViewer /> : <Navigate replace to="/" />,
  }
]);
 
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
