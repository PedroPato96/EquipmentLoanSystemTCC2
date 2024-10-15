// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './context/AuthContext'; // Certifique-se de que o caminho está correto
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
