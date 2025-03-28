import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NewsSection = styled.section`
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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  perspective: 1000px;
`;

const NewsCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const NewsImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(10, 25, 47, 0.8));
  }
`;

const NewsContent = styled.div`
  padding: 1.5rem;
`;

const NewsDate = styled.div`
  color: #64FFDA;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const NewsTitle = styled.h3`
  color: #CCD6F6;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const NewsDescription = styled.p`
  color: #8892B0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMore = styled(motion.button)`
  background: transparent;
  border: 1px solid #64FFDA;
  color: #64FFDA;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const News = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const news = [
    {
      id: 1,
      title: "Запуск новой игры Cyber Adventure",
      description: "Мы рады сообщить о запуске нашей новой игры в жанре киберпанк. Исследуйте футуристический мир, решайте головоломки и раскрывайте тайны.",
      date: "15 марта 2024",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Обновление Space Explorer",
      description: "Большое обновление для популярной космической игры добавляет новые планеты, улучшенную графику и захватывающий сюжет.",
      date: "10 марта 2024",
      image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Новые технологии в разработке",
      description: "Мы внедряем передовые технологии машинного обучения для создания более реалистичных NPC и улучшенного ИИ в наших играх.",
      date: "5 марта 2024",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <NewsSection>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Последние новости
        </Title>
        <NewsGrid ref={ref}>
          {news.map((item, index) => (
            <NewsCard
              key={item.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, rotateX: 5 }}
            >
              <NewsImage image={item.image} />
              <NewsContent>
                <NewsDate>{item.date}</NewsDate>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsDescription>{item.description}</NewsDescription>
                <ReadMore
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Читать далее
                </ReadMore>
              </NewsContent>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsSection>
  );
};

export default News; 