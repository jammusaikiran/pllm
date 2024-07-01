import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Adjust the import path if your App component is in a different file
import './index.css'; // Optional: If you have global CSS
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);
