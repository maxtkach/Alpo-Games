import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TechSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(180deg, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.95) 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #64FFDA;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  perspective: 1000px;
`;

const TechCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  will-change: transform;

  &:hover {
    transform: translateY(-10px);
    background: rgba(17, 34, 64, 0.9);
    border-color: rgba(100, 255, 218, 0.5);
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.2);
  }
`;

const TechIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #64FFDA;
  text-align: center;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.2);
  transform: translateZ(20px);
  transition: transform 0.2s ease, text-shadow 0.2s ease;
  will-change: transform;

  ${TechCard}:hover & {
    transform: translateZ(25px);
    text-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  }
`;

const TechTitle = styled.h3`
  color: #CCD6F6;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  transform: translateZ(15px);
`;

const TechDescription = styled.p`
  color: #8892B0;
  font-size: 1rem;
  line-height: 1.6;
  transform: translateZ(10px);
`;

const TechFeatures = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  transform: translateZ(5px);
`;

const TechFeature = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 15px;
  color: #64FFDA;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
  will-change: transform, background-color, color;
  
  &:hover {
    background: rgba(100, 255, 218, 0.2);
    color: #64FFDA;
    transform: translateY(-2px);
  }
`;

const Tech = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const technologies = [
    {
      id: 1,
      title: "Unreal Engine",
      description: "Продвинутый игровой движок для создания высококачественных 3D-игр с фотореалистичной графикой.",
      icon: "🎮",
      features: ["Фотореализм", "Blueprint", "VR"]
    },
    {
      id: 2,
      title: "Unity",
      description: "Универсальный движок для разработки 2D и 3D игр с широкими возможностями кросс-платформенной разработки.",
      icon: "🎯",
      features: ["2D/3D", "Физика", "Анимации"]
    },
    {
      id: 3,
      title: "React",
      description: "Современный JavaScript-фреймворк для создания интерактивных пользовательских интерфейсов.",
      icon: "⚛️",
      features: ["Hooks", "Redux", "TypeScript"]
    },
    {
      id: 4,
      title: "Three.js",
      description: "Мощная библиотека для создания 3D-графики в браузере с использованием WebGL.",
      icon: "🌐",
      features: ["WebGL", "Анимации", "Интерактивность"]
    },
    {
      id: 5,
      title: "Node.js",
      description: "Серверная платформа для создания масштабируемых сетевых приложений.",
      icon: "🚀",
      features: ["Express", "MongoDB", "WebSocket"]
    },
    {
      id: 6,
      title: "MongoDB",
      description: "Гибкая NoSQL база данных для хранения и обработки больших объемов данных.",
      icon: "🗄️",
      features: ["NoSQL", "Масштабируемость", "Гибкость"]
    }
  ];

  return (
    <TechSection>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Наши технологии
        </Title>
        <TechGrid ref={ref}>
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateX: 5 }}
            >
              <TechIcon>{tech.icon}</TechIcon>
              <TechTitle>{tech.title}</TechTitle>
              <TechDescription>{tech.description}</TechDescription>
              <TechFeatures>
                {tech.features.map(feature => (
                  <TechFeature key={feature}>{feature}</TechFeature>
                ))}
              </TechFeatures>
            </TechCard>
          ))}
        </TechGrid>
      </Container>
    </TechSection>
  );
};

export default Tech; 