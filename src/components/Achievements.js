import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from './AnimatedBackground';

const AchievementsSection = styled.section`
  padding: 100px 0;
  background: var(--deep-blue);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--neon-cyan);
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
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

const AchievementIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: var(--neon-cyan);
  text-align: center;
  text-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
  transform: translateZ(20px);
`;

const AchievementTitle = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  transform: translateZ(15px);
`;

const AchievementDescription = styled.p`
  color: var(--light-blue);
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  transform: translateZ(10px);
`;

const AchievementNumber = styled(motion.div)`
  font-size: 3.5rem;
  color: var(--neon-pink);
  text-align: center;
  margin: 1rem 0;
  text-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
  transform: translateZ(25px);
`;

const AchievementProgress = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
  transform: translateZ(5px);
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: var(--neon-cyan);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
`;

const Achievement = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Трансформации для заголовка
  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const titleRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10]);
  const titleBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Трансформации для карточек
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const cardBlur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10]);
  const cardBrightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Создаем массив трансформаций для каждой карточки
  const cardTransforms = [
    {
      y: useTransform(scrollYProgress, [0, 1], [100, -100]),
      opacity: cardOpacity,
      scale: cardScale,
      rotateX: cardRotateX,
      blur: cardBlur,
      brightness: cardBrightness
    },
    {
      y: useTransform(scrollYProgress, [0, 1], [200, -200]),
      opacity: cardOpacity,
      scale: cardScale,
      rotateX: cardRotateX,
      blur: cardBlur,
      brightness: cardBrightness
    },
    {
      y: useTransform(scrollYProgress, [0, 1], [300, -300]),
      opacity: cardOpacity,
      scale: cardScale,
      rotateX: cardRotateX,
      blur: cardBlur,
      brightness: cardBrightness
    },
    {
      y: useTransform(scrollYProgress, [0, 1], [400, -400]),
      opacity: cardOpacity,
      scale: cardScale,
      rotateX: cardRotateX,
      blur: cardBlur,
      brightness: cardBrightness
    }
  ];

  const achievements = [
    {
      icon: '🎮',
      title: 'Выпущенных игр',
      number: 50,
      description: 'Успешно выпущенных проектов',
      progress: 100
    },
    {
      icon: '👥',
      title: 'Активных игроков',
      number: 1000000,
      description: 'Игроков по всему миру',
      progress: 75
    },
    {
      icon: '🏆',
      title: 'Наград',
      number: 25,
      description: 'Полученных наград и признаний',
      progress: 60
    },
    {
      icon: '🌍',
      title: 'Стран',
      number: 150,
      description: 'Стран, где доступны наши игры',
      progress: 80
    }
  ];

  return (
    <AchievementsSection ref={containerRef}>
      <AnimatedBackground colors={['#64FFDA', '#FF6B6B', '#4ECDC4']} />
      
      <Container>
        <Title
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ 
            y: titleY, 
            opacity: titleOpacity, 
            scale: titleScale, 
            rotate: titleRotate, 
            filter: `blur(${titleBlur}px) brightness(${titleBrightness})` 
          }}
        >
          Наши достижения
        </Title>
        
        <AchievementsGrid>
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              style={{
                y: cardTransforms[index].y,
                opacity: cardTransforms[index].opacity,
                scale: cardTransforms[index].scale,
                rotateX: cardTransforms[index].rotateX,
                filter: `blur(${cardTransforms[index].blur}px) brightness(${cardTransforms[index].brightness})`
              }}
            >
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementNumber
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              >
                {achievement.number.toLocaleString()}
              </AchievementNumber>
              <AchievementDescription>{achievement.description}</AchievementDescription>
              <AchievementProgress>
                <ProgressBar
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${achievement.progress}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.2 + 0.8 }}
                />
              </AchievementProgress>
            </AchievementCard>
          ))}
        </AchievementsGrid>
      </Container>
    </AchievementsSection>
  );
};

export default Achievement; 