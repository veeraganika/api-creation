
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Components/AuthProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider >
    <App />
    <ToastContainer />
  </AuthProvider>,
)
