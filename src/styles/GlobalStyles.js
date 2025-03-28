import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --deep-blue: #0A192F;
    --neon-cyan: #64FFDA;
    --light-blue: #8892B0;
    --gradient-blue: linear-gradient(135deg, #0A192F 0%, #112240 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--deep-blue);
    color: #fff;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: var(--neon-cyan);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #fff;
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  .section {
    min-height: 100vh;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .kuGFZM{
  overflow-y: hidden !important;
  }
`; 