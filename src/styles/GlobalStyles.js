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
    -webkit-text-size-adjust: 100%; /* Предотвращает увеличение текста на мобильных в ландшафтном режиме */
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--deep-blue);
    color: #fff;
    overflow-x: hidden;
    -webkit-overflow-scrolling: auto;
    backface-visibility: hidden;
    /* Улучшаем производительность на мобильных */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    touch-action: manipulation; /* Улучшает отзывчивость тач-событий */
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
    -webkit-tap-highlight-color: transparent; /* Убирает подсветку при тапе на мобильных */
  }

  .section {
    min-height: 100vh;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
    
    @media (max-width: 768px) {
      min-height: auto;
      padding: 80px 0;
    }
    
    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    
    @media (max-width: 480px) {
      padding: 0 15px;
    }
  }

  .kuGFZM {
    overflow-y: visible !important;
  }

  .SectionWrapper {
    filter: none !important;
    -webkit-filter: none !important;
  }

  /* Отключаем анимации и переходы на мобильных устройствах для повышения производительности */
  @media (prefers-reduced-motion: reduce), (max-width: 768px) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Исправляем проблемы с viewport на мобильных устройствах */
  @media (max-width: 768px) {
    input, textarea, select, button {
      font-size: 16px !important; /* Предотвращает масштабирование на iOS при фокусе на поле ввода */
    }
  }
  
  /* Исправляем проблемы с 100vh на мобильных устройствах */
  @media only screen and (max-width: 768px) and (orientation: portrait) {
    .section {
      min-height: calc(100vh - 60px); /* Компенсация для адресной строки браузера */
    }
  }
`; 