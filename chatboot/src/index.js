import React from 'react';
import App from './App'; 
import  {createRoot}  from 'react-dom/client';

const root = createRoot(document.getElementById('chatbot')); 

root.render(<App />); 
