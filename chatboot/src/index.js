import React from 'react';
import App from './App'; 

import reportWebVitals from './reportWebVitals';

import  {createRoot}  from 'react-dom/client';

const root = createRoot(document.getElementById('chatbot')); 

root.render(<App />); 
reportWebVitals();
