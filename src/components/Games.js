import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from './AnimatedBackground';

const GamesSection = styled.section`
  padding: 100px 0;
  position: relative;
  background: linear-gradient(135deg, #0A192F 0%, #112240 100%);
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

const GamesGrid = styled.div`
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

const GameCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border-radius: 15px;
  padding: 2rem;
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

const GameImage = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1.5rem;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transform: translateZ(20px);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  ${GameCard}:hover &::after {
    opacity: 1;
  }
  
  ${GameCard}:hover img {
    transform: scale(1.1);
  }
`;

const GameTitle = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 1rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  transform: translateZ(15px);
`;

const GameDescription = styled.p`
  color: var(--light-blue);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transform: translateZ(10px);
`;

const GameFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  transform: translateZ(5px);
`;

const GameFeature = styled.span`
  padding: 0.3rem 0.8rem;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--neon-cyan);
  border-radius: 15px;
  color: var(--neon-cyan);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--neon-cyan);
    color: var(--deep-blue);
    transform: translateY(-2px);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  }
`;

const GameLink = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--neon-cyan);
  color: var(--deep-blue);
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
  transform: translateZ(10px);
  
  &:hover {
    background: var(--neon-pink);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
  }
`;

const Games = () => {
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
  const titleY = useTransform(scrollYProgress, [0, 1], [200, -200]);
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
    }
  ];

  const games = [
    {
      title: 'Cyber Adventure',
      description: 'Захватывающая игра в жанре киберпанк с открытым миром и множеством миссий.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      features: ['Открытый мир', 'Киберпанк', 'RPG'],
      link: '#'
    },
    {
      title: 'Space Explorer',
      description: 'Исследуйте далекие галактики и открывайте новые планеты в этой космической игре.',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      features: ['Космос', 'Исследования', 'Строительство'],
      link: '#'
    }
  ];

  return (
    <GamesSection ref={containerRef}>
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
          Наши проекты
        </Title>
        
        <GamesGrid>
          {games.map((game, index) => (
            <GameCard
              key={game.title}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -20,
                rotateX: 10,
                scale: 1.05,
                boxShadow: '0 0 50px rgba(100, 255, 218, 0.4)'
              }}
              style={{
                y: cardTransforms[index].y,
                opacity: cardTransforms[index].opacity,
                scale: cardTransforms[index].scale,
                rotateX: cardTransforms[index].rotateX,
                filter: `blur(${cardTransforms[index].blur}px) brightness(${cardTransforms[index].brightness})`
              }}
            >
              <GameImage>
                <img src={game.image} alt={game.title} />
              </GameImage>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <GameFeatures>
                {game.features.map(feature => (
                  <GameFeature key={feature}>{feature}</GameFeature>
                ))}
              </GameFeatures>
              <GameLink
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Играть сейчас
              </GameLink>
            </GameCard>
          ))}
        </GamesGrid>
      </Container>
    </GamesSection>
  );
};

export default Games; 