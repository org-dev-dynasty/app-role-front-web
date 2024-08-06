import 'primeicons/primeicons.css';
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { Contact } from './components/Contact.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Contact />
  </React.StrictMode>,
)
