
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker
registerSW({
  onNeedRefresh() {
    // This will be handled in the UpdateNotification component
  },
  onOfflineReady() {
    console.log('App is ready for offline use');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
