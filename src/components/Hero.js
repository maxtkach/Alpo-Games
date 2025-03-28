import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Stars } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from './AnimatedBackground';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
  background: linear-gradient(135deg, #112240 0%, #1A365D 100%);
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  color: #CCD6F6;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  background: linear-gradient(45deg, #fff, #64FFDA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #8892B0;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #8892B0;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  color: #64FFDA;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #8892B0;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: #64FFDA;
  color: #0A192F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(100, 255, 218, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: transparent;
  color: #64FFDA;
  border: 2px solid #64FFDA;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(100, 255, 218, 0.2);
  }
`;

const FloatingShape = ({ position, rotation, scale, color }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={1}
    >
      <mesh position={position} rotation={rotation} scale={scale}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <HeroSection>
      <AnimatedBackground />
      <HeroContent ref={ref}>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Alpo Games
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Инновационные проекты, которые меняют представление об играх
        </Subtitle>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Мы создаем уникальные игровые миры, используя передовые технологии и креативный подход. 
          Наша команда профессионалов стремится к созданию незабываемого игрового опыта.
        </Description>
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Наши проекты
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Смотреть проекты
          </SecondaryButton>
        </ButtonContainer>
        <StatsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <StatItem>
            <StatNumber>10+</StatNumber>
            <StatLabel>Выпущенных игр</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>1M+</StatNumber>
            <StatLabel>Игроков</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>50+</StatNumber>
            <StatLabel>Наград</StatLabel>
          </StatItem>
        </StatsContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 