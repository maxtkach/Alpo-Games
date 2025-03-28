import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TestimonialsSection = styled.section`
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  perspective: 1000px;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.7);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  border: 1px solid rgba(100, 255, 218, 0.1);
  will-change: transform;

  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 4rem;
    color: #64FFDA;
    opacity: 0.2;
    font-family: serif;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px);
    background: rgba(17, 34, 64, 0.9);
    border-color: rgba(100, 255, 218, 0.5);
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.2);

    &::before {
      opacity: 0.5;
      transform: scale(1.1);
    }
  }
`;

const TestimonialContent = styled.p`
  color: #CCD6F6;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  transform: translateZ(10px);
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateZ(15px);
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border: 2px solid rgba(100, 255, 218, 0.1);
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;

  ${TestimonialCard}:hover & {
    border-color: rgba(100, 255, 218, 0.5);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
    transform: scale(1.1);
  }
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  color: #64FFDA;
  font-size: 1.1rem;
  margin: 0;
`;

const AuthorRole = styled.p`
  color: #8892B0;
  font-size: 0.9rem;
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: 1rem;
  transform: translateZ(5px);
`;

const Star = styled.span`
  color: #64FFDA;
  font-size: 1.2rem;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;

  ${TestimonialCard}:hover & {
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  }
`;

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      id: 1,
      content: "Игра просто потрясающая! Графика на высшем уровне, геймплей увлекательный, а сюжет затягивает с первых минут.",
      author: "Александр Петров",
      role: "Игровой критик",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      content: "Отличная работа команды! Особенно впечатлили анимации и физика. Чувствуется профессионализм в каждой детали.",
      author: "Мария Иванова",
      role: "Игровой блогер",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      content: "Одна из лучших игр в жанре! Инновационный подход к геймплею и потрясающая атмосфера. Рекомендую всем!",
      author: "Дмитрий Сидоров",
      role: "Профессиональный геймер",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <TestimonialsSection>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Отзывы игроков
        </Title>
        <TestimonialsGrid ref={ref}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, rotateX: 5 }}
            >
              <TestimonialContent>{testimonial.content}</TestimonialContent>
              <TestimonialAuthor>
                <AuthorAvatar image={testimonial.image} />
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorRole>{testimonial.role}</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
              <Rating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i}>★</Star>
                ))}
              </Rating>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials; 