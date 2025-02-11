import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer,toast } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
