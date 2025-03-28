import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const GlobalStyles = createGlobalStyle`
  :root {
    --deep-blue: #0a192f;
    --light-blue: #8892b0;
    --neon-cyan: #64ffda;
    --gradient-blue: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    
  .kuGFZM{
  overflow-y: hidden !important;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--deep-blue);
    color: var(--light-blue);
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--deep-blue);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--neon-cyan);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #4ECDC4;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
); 