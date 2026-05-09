import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { RoomProvider } from './context/RoomContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <RoomProvider>
          <App />
        </RoomProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
