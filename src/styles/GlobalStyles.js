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

  html {
    scroll-behavior: auto;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--deep-blue);
    color: #fff;
    overflow-x: hidden;
    -webkit-overflow-scrolling: auto;
    backface-visibility: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: var(--neon-cyan);
    text-decoration: none;
    transition: color 0.2s ease;
    
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

  .kuGFZM {
    overflow-y: visible !important;
  }

  .SectionWrapper {
    filter: none !important;
    -webkit-filter: none !important;
  }

  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`; 