import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBackground from './AnimatedBackground';

const TeamSection = styled.section`
  padding: 150px 0;
  background: var(--deep-blue);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 4rem;
  color: var(--neon-cyan);
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--neon-cyan);
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  perspective: 1000px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled(motion.div)`
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid var(--neon-cyan);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(100, 255, 218, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
`;

const MemberImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  position: relative;
  transform: translateZ(20px);
`;

const MemberImageInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--neon-cyan);
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const MemberName = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  transform: translateZ(15px);
`;

const MemberRole = styled.p`
  color: var(--light-blue);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  transform: translateZ(10px);
`;

const MemberBio = styled.p`
  color: var(--light-blue);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transform: translateZ(5px);
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  transform: translateZ(10px);
`;

const SocialLink = styled.a`
  color: var(--neon-cyan);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--neon-pink);
    transform: translateY(-3px);
  }
`;

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 0]);

  const teamMembers = [
    {
      name: 'Александр Петров',
      role: 'Главный разработчик',
      bio: '10+ лет опыта в разработке игр. Специализируется на Unity и Unreal Engine.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: [
        { icon: '🐦', url: 'https://twitter.com' },
        { icon: '💼', url: 'https://linkedin.com' },
        { icon: '💻', url: 'https://github.com' }
      ]
    },
    {
      name: 'Мария Иванова',
      role: 'UI/UX дизайнер',
      bio: 'Создает потрясающие пользовательские интерфейсы и анимации.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: [
        { icon: '🐦', url: 'https://twitter.com' },
        { icon: '💼', url: 'https://linkedin.com' },
        { icon: '💻', url: 'https://github.com' }
      ]
    },
    {
      name: 'Дмитрий Сидоров',
      role: '3D художник',
      bio: 'Создает высококачественные 3D модели и анимации для наших игр.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      social: [
        { icon: '🐦', url: 'https://twitter.com' },
        { icon: '💼', url: 'https://linkedin.com' },
        { icon: '💻', url: 'https://github.com' }
      ]
    }
  ];

  return (
    <TeamSection ref={containerRef}>
      <AnimatedBackground colors={['#64FFDA', '#FF6B6B', '#4ECDC4']} />
      
      <Container>
        <Title
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ y, opacity }}
        >
          Наша команда
        </Title>
        
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{
                y,
                opacity
              }}
            >
              <MemberImage>
                <MemberImageInner>
                  <img src={member.image} alt={member.name} />
                </MemberImageInner>
              </MemberImage>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
              <SocialLinks>
                {member.social.map((link, i) => (
                  <SocialLink 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </SocialLink>
                ))}
              </SocialLinks>
            </TeamMember>
          ))}
        </TeamGrid>
      </Container>
    </TeamSection>
  );
};

export default Team; 