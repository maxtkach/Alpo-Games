import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  padding: 100px 0;
  background: var(--deep-blue);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--neon-cyan);
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: var(--neon-cyan);
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 50px;
  width: 50%;
  padding-right: 30px;
  
  &:nth-child(even) {
    margin-left: 50%;
    padding-right: 0;
    padding-left: 30px;
  }
`;

const TimelineContent = styled.div`
  background: rgba(100, 255, 218, 0.1);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--neon-cyan);
`;

const Year = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: var(--light-blue);
  line-height: 1.6;
`;

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const timelineItems = [
    {
      year: '2020',
      description: 'Основание Alpo Games с видением создания инновационных игр'
    },
    {
      year: '2021',
      description: 'Запуск первой успешной игры и расширение команды'
    },
    {
      year: '2022',
      description: 'Разработка собственного игрового движка и новые проекты'
    },
    {
      year: '2023',
      description: 'Международное признание и партнерства с крупными издателями'
    }
  ];

  return (
    <AboutSection>
      <Container>
        <Title
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          О нас
        </Title>
        
        <Timeline>
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TimelineContent>
                <Year>{item.year}</Year>
                <Description>{item.description}</Description>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </AboutSection>
  );
};

export default About; 