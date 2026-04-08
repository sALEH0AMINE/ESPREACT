import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { AuthProvider } from './context/AuthContext';
import 'simplebar-react/dist/simplebar.min.css';

document.documentElement.setAttribute("lang", "ar");
document.documentElement.setAttribute("dir", "rtl");
document.body.setAttribute("dir", "rtl");



const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <CacheProvider value={rtlCache}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </CacheProvider>
    </BrowserRouter>
  </React.StrictMode>
);
