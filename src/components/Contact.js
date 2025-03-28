import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D } from '@react-three/drei';

const ContactSection = styled.section`
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  color: var(--light-blue);
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  color: var(--neon-cyan);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 3px;
    background: var(--neon-cyan);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactForm = styled(motion.form)`
  background: rgba(100, 255, 218, 0.05);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--neon-cyan);
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: var(--neon-cyan);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--neon-cyan);
  border-radius: 8px;
  color: var(--light-blue);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--neon-cyan);
  border-radius: 8px;
  color: var(--light-blue);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--neon-cyan);
  color: var(--neon-cyan);
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
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
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 255, 218, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: var(--neon-cyan);
    color: var(--deep-blue);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
    
    &::before {
      left: 100%;
    }
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

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
  };

  return (
    <ContactSection ref={containerRef}>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingShape position={[-5, 0, -5]} rotation={[0, 0, 0]} scale={1} color="#64FFDA" />
        <FloatingShape position={[5, 0, -5]} rotation={[Math.PI / 4, 0, 0]} scale={1.2} color="#FF6B6B" />
        <FloatingShape position={[0, 0, -3]} rotation={[0, Math.PI / 4, 0]} scale={0.8} color="#4ECDC4" />
      </Canvas>

      <Container>
        <ContactInfo
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ x, opacity }}
        >
          <Title>Свяжитесь с нами</Title>
          <Description>
            У вас есть вопросы или предложения? Мы всегда готовы помочь и ответить на ваши сообщения. Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
          </Description>
        </ContactInfo>

        <ContactForm
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label>Ваше имя</Label>
            <Input type="text" required />
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" required />
          </FormGroup>
          
          <FormGroup>
            <Label>Сообщение</Label>
            <TextArea required />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Отправить
          </SubmitButton>
        </ContactForm>
      </Container>
    </ContactSection>
  );
};

export default Contact; 