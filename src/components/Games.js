import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from './AnimatedBackground';

const GamesSection = styled.section`
  padding: 100px 0;
  position: relative;
  background: linear-gradient(135deg, #0A192F 0%, #112240 100%);
  overflow: hidden;
  /* Добавляем идентификатор для прокрутки */
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

// Добавляем стили модального окна
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 25, 47, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: var(--deep-blue);
  border: 2px solid var(--neon-cyan);
  border-radius: 15px;
  padding: 2rem;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(100, 255, 218, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--neon-cyan);
    border-radius: 10px;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: var(--neon-cyan);
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: #fff;
  }
`;

const ModalTitle = styled.h2`
  color: var(--neon-cyan);
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1.5rem;
`;

const ModalDescription = styled.p`
  color: var(--light-blue);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const ModalFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ModalFeatureTitle = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 1rem;
  width: 100%;
`;

const ScreenshotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Screenshot = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const GamePlayButton = styled(motion.button)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--neon-cyan);
  color: var(--deep-blue);
  border: none;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateZ(10px);
  
  &:hover {
    background: var(--neon-pink);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
  }
`;

// Тост-уведомление
const Toast = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--neon-cyan);
  color: var(--deep-blue);
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: bold;
  z-index: 100;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Games = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Состояния для модального окна и тоста
  const [selectedGame, setSelectedGame] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  // Расширенные данные игр
  const games = [
    {
      id: 1,
      title: 'Cyber Adventure',
      description: 'Захватывающая игра в жанре киберпанк с открытым миром и множеством миссий.',
      fullDescription: 'Погрузись в захватывающий мир киберпанка, где технологии будущего переплетаются с человеческими страстями. Исследуйте огромный неоновый мегаполис, выполняйте разнообразные миссии и встречайте колоритных персонажей. Улучшайте своего героя кибернетическими имплантами и оружием, чтобы выжить в этом опасном мире.',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      features: ['Открытый мир', 'Киберпанк', 'RPG'],
      releaseDate: '15 июня 2023',
      platforms: ['Windows', 'PlayStation 5', 'Xbox Series X'],
      developer: 'Alpo Games Studio',
      publisher: 'Alpo Games',
      screenshots: [
        'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      link: '#'
    },
    {
      id: 2,
      title: 'Space Explorer',
      description: 'Исследуйте далекие галактики и открывайте новые планеты в этой космической игре.',
      fullDescription: 'Space Explorer — это захватывающая космическая одиссея, где вам предстоит исследовать бесконечные просторы вселенной. Открывайте новые планеты, изучайте уникальные формы жизни и создавайте космические колонии. Улучшайте свой корабль, собирайте ресурсы и защищайтесь от враждебных инопланетных цивилизаций.',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      features: ['Космос', 'Исследования', 'Строительство'],
      releaseDate: '10 сентября 2023',
      platforms: ['Windows', 'MacOS', 'Linux'],
      developer: 'Alpo Games Studio',
      publisher: 'Alpo Games',
      screenshots: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      link: '#'
    }
  ];

  // Обработчик для открытия модального окна
  const openGameDetails = (game) => {
    setSelectedGame(game);
  };

  // Обработчик для закрытия модального окна
  const closeGameDetails = () => {
    setSelectedGame(null);
  };

  // Обработчик для кнопки "Играть сейчас"
  const handlePlayGame = (game) => {
    setToastMessage(`Запуск игры "${game.title}"...`);
    setShowToast(true);
    
    // Скрываем тост через 3 секунды
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <GamesSection ref={containerRef} id="games">
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
              key={game.id}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              style={{ ...cardTransforms[index % cardTransforms.length] }}
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
              <motion.div style={{ display: 'flex', gap: '1rem' }}>
                <GamePlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlayGame(game)}
                >
                  Играть сейчас
                </GamePlayButton>
                <GamePlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openGameDetails(game)}
                  style={{ background: 'transparent', border: '2px solid var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                >
                  Подробнее
                </GamePlayButton>
              </motion.div>
            </GameCard>
          ))}
        </GamesGrid>
      </Container>
      
      {/* Модальное окно с деталями игры */}
      <AnimatePresence>
        {selectedGame && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGameDetails}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalClose onClick={closeGameDetails}>&times;</ModalClose>
              <ModalTitle>{selectedGame.title}</ModalTitle>
              <ModalImg src={selectedGame.image} alt={selectedGame.title} />
              <ModalDescription>{selectedGame.fullDescription}</ModalDescription>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>Дата выхода:</h3>
                <p style={{ color: 'var(--light-blue)' }}>{selectedGame.releaseDate}</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>Платформы:</h3>
                <p style={{ color: 'var(--light-blue)' }}>{selectedGame.platforms.join(', ')}</p>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '0.5rem' }}>Разработчик:</h3>
                <p style={{ color: 'var(--light-blue)' }}>{selectedGame.developer}</p>
              </div>
              
              <ModalFeatures>
                <ModalFeatureTitle>Особенности:</ModalFeatureTitle>
                {selectedGame.features.map(feature => (
                  <GameFeature key={feature}>{feature}</GameFeature>
                ))}
              </ModalFeatures>
              
              <div>
                <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '1rem' }}>Скриншоты:</h3>
                <ScreenshotsGrid>
                  {selectedGame.screenshots.map((screenshot, index) => (
                    <Screenshot key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
                  ))}
                </ScreenshotsGrid>
              </div>
              
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <GamePlayButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlayGame(selectedGame)}
                >
                  Играть сейчас
                </GamePlayButton>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      {/* Всплывающее уведомление */}
      {showToast && (
        <Toast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {toastMessage}
        </Toast>
      )}
    </GamesSection>
  );
};

export default Games; 