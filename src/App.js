import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import Games from './components/Games';
import Achievements from './components/Achievements';
import Tech from './components/Tech';
import Team from './components/Team';
import News from './components/News';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';

const AppContainer = styled.div`
  position: relative;
  overflow-x: hidden;
  background: var(--deep-blue);
`;

const SectionWrapper = styled(motion.div)`
  position: relative;
  z-index: ${props => props.zIndex};
  width: 100%;
  transform-origin: center;
`;

const App = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Эффекты для разных секций
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const gamesY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0]);
  const achievementsY = useTransform(scrollYProgress, [0.4, 0.6], [30, 0]);
  const techY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0]);
  const teamY = useTransform(scrollYProgress, [0.8, 1], [30, 0]);
  const contactY = useTransform(scrollYProgress, [1, 1.2], [30, 0]);

  // Эффекты прозрачности с минимальным затуханием
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const gamesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0.7, 1]);
  const achievementsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0.7, 1]);
  const techOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0.7, 1]);
  const teamOpacity = useTransform(scrollYProgress, [0.8, 1], [0.7, 1]);
  const contactOpacity = useTransform(scrollYProgress, [1, 1.2], [0.7, 1]);

  // Эффекты масштабирования
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const gamesScale = useTransform(scrollYProgress, [0.2, 0.4], [0.98, 1]);
  const achievementsScale = useTransform(scrollYProgress, [0.4, 0.6], [0.98, 1]);
  const techScale = useTransform(scrollYProgress, [0.6, 0.8], [0.98, 1]);
  const teamScale = useTransform(scrollYProgress, [0.8, 1], [0.98, 1]);
  const contactScale = useTransform(scrollYProgress, [1, 1.2], [0.98, 1]);

  return (
    <AppContainer ref={containerRef}>
      <AnimatedBackground />
      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0, 0.2], [0, -30]),
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.7]),
          scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.95]),
          filter: useTransform(scrollYProgress, [0, 0.2], ['blur(0px)', 'blur(2px)'])
        }}
      >
        <Hero />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.1, 0.3], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.1, 0.3], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.1, 0.3], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Games />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.2, 0.4], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.2, 0.4], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.2, 0.4], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Achievements />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.3, 0.5], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.3, 0.5], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.3, 0.5], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.3, 0.5], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Tech />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.4, 0.6], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.4, 0.6], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.4, 0.6], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Team />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.5, 0.7], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.5, 0.7], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.5, 0.7], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.5, 0.7], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <News />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.6, 0.8], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.6, 0.8], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.6, 0.8], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.6, 0.8], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper
        style={{
          y: useTransform(scrollYProgress, [0.7, 0.9], [30, 0]),
          opacity: useTransform(scrollYProgress, [0.7, 0.9], [0.7, 1]),
          scale: useTransform(scrollYProgress, [0.7, 0.9], [0.95, 1]),
          filter: useTransform(scrollYProgress, [0.7, 0.9], ['blur(2px)', 'blur(0px)'])
        }}
      >
        <Contact />
      </SectionWrapper>
    </AppContainer>
  );
};

export default App; 