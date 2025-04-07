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

  // Удаляем или уменьшаем эффекты трансформации для повышения производительности
  // Минимальные значения для смещения и прозрачности
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const gamesY = useTransform(scrollYProgress, [0.2, 0.4], [10, 0]);
  const achievementsY = useTransform(scrollYProgress, [0.4, 0.6], [10, 0]);
  const techY = useTransform(scrollYProgress, [0.6, 0.8], [10, 0]);
  const teamY = useTransform(scrollYProgress, [0.8, 1], [10, 0]);
  const contactY = useTransform(scrollYProgress, [1, 1.2], [10, 0]);

  // Уменьшаем эффекты прозрачности
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const gamesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0.9, 1]);
  const achievementsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1]);
  const techOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1]);
  const teamOpacity = useTransform(scrollYProgress, [0.8, 1], [0.9, 1]);
  const contactOpacity = useTransform(scrollYProgress, [1, 1.2], [0.9, 1]);

  return (
    <AppContainer ref={containerRef}>
      <AnimatedBackground />
      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: heroY,
          opacity: heroOpacity
        }}
      >
        <Hero />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: gamesY,
          opacity: gamesOpacity
        }}
      >
        <Games />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: achievementsY,
          opacity: achievementsOpacity
        }}
      >
        <Achievements />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: techY,
          opacity: techOpacity
        }}
      >
        <Tech />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: teamY,
          opacity: teamOpacity
        }}
      >
        <Team />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: useTransform(scrollYProgress, [0.5, 0.7], [10, 0]),
          opacity: useTransform(scrollYProgress, [0.5, 0.7], [0.9, 1])
        }}
      >
        <News />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: useTransform(scrollYProgress, [0.6, 0.8], [10, 0]),
          opacity: useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1])
        }}
      >
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper
        className="SectionWrapper"
        style={{
          y: useTransform(scrollYProgress, [0.7, 0.9], [10, 0]),
          opacity: useTransform(scrollYProgress, [0.7, 0.9], [0.9, 1])
        }}
      >
        <Contact />
      </SectionWrapper>
    </AppContainer>
  );
};

export default App; 