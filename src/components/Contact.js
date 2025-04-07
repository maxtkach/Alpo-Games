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
  
  @media (max-width: 768px) {
    padding: 100px 0;
  }
  
  @media (max-width: 480px) {
    padding: 80px 0;
  }
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
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 15px;
    gap: 1.5rem;
  }
`;

const ContactInfo = styled(motion.div)`
  color: var(--light-blue);
  
  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 1rem;
  }
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
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(100, 255, 218, 0.05);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--neon-cyan);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  color: var(--neon-cyan);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
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
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    border-radius: 6px;
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
  
  @media (max-width: 768px) {
    min-height: 120px;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    min-height: 100px;
    border-radius: 6px;
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
  
  @media (max-width: 768px) {
    display: block;
    margin: 0 auto;
    padding: 0.8rem 1.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.7rem 1.5rem;
    border-radius: 25px;
  }
`;

const FloatingShape = ({ position, rotation, scale, color, isMobile }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={isMobile ? 0.5 : 1}
      floatIntensity={isMobile ? 0.5 : 1}
    >
      <mesh position={position} rotation={rotation} scale={isMobile ? scale * 0.7 : scale}>
        <torusKnotGeometry args={[1, 0.3, isMobile ? 64 : 128, isMobile ? 8 : 16]} />
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

  const [isMobile, setIsMobile] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Введите ваше имя';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Введите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Введите корректный email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Введите сообщение';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setShowToast(true);
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => {
        setShowToast(false);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 1000);
      }, 5000);
    }, 1500);
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
        frameloop={isMobile ? "demand" : "always"}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {!isMobile && (
          <>
            <FloatingShape 
              position={[-5, 0, -5]} 
              rotation={[0, 0, 0]} 
              scale={1} 
              color="#64FFDA"
              isMobile={isMobile} 
            />
            <FloatingShape 
              position={[5, 0, -5]} 
              rotation={[Math.PI / 4, 0, 0]} 
              scale={1.2} 
              color="#FF6B6B"
              isMobile={isMobile} 
            />
          </>
        )}
        
        <FloatingShape 
          position={[0, 0, -3]} 
          rotation={[0, Math.PI / 4, 0]} 
          scale={0.8} 
          color="#4ECDC4"
          isMobile={isMobile} 
        />
      </Canvas>

      <Container>
        <ContactInfo
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          style={{ x: isMobile ? 0 : x, opacity }}
        >
          <Title>Свяжитесь с нами</Title>
          <Description>
            У вас есть вопросы или предложения? Мы всегда готовы помочь и ответить на ваши сообщения. Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
          </Description>
        </ContactInfo>

        <ContactForm
          initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label>Ваше имя</Label>
            <Input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ borderColor: formErrors.name ? '#FF6B6B' : '' }}
              required 
            />
            {formErrors.name && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                style={{ color: '#FF6B6B', fontSize: '0.8rem', marginTop: '5px' }}
              >
                {formErrors.name}
              </motion.div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: formErrors.email ? '#FF6B6B' : '' }}
              required 
            />
            {formErrors.email && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                style={{ color: '#FF6B6B', fontSize: '0.8rem', marginTop: '5px' }}
              >
                {formErrors.email}
              </motion.div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Сообщение</Label>
            <TextArea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{ borderColor: formErrors.message ? '#FF6B6B' : '' }}
              required 
            />
            {formErrors.message && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                style={{ color: '#FF6B6B', fontSize: '0.8rem', marginTop: '5px' }}
              >
                {formErrors.message}
              </motion.div>
            )}
          </FormGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            style={{
              background: isSubmitted ? 'var(--neon-cyan)' : '',
              color: isSubmitted ? 'var(--deep-blue)' : ''
            }}
          >
            {isSubmitting ? 'Отправка...' : isSubmitted ? 'Отправлено!' : 'Отправить'}
          </SubmitButton>
        </ContactForm>
      </Container>
      
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--neon-cyan)',
            color: 'var(--deep-blue)',
            padding: '1rem 2rem',
            borderRadius: '5px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
        </motion.div>
      )}
    </ContactSection>
  );
};

export default Contact; 