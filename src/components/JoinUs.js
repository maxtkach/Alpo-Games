import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const JoinUsSection = styled.section`
  padding: 100px 0;
  background: var(--gradient-blue);
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

const ChallengeContainer = styled(motion.div)`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--neon-cyan);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ChallengeTitle = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 1rem;
`;

const ChallengeDescription = styled.p`
  color: var(--light-blue);
  margin-bottom: 1rem;
`;

const CodeInput = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--neon-cyan);
  color: var(--neon-cyan);
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 1rem;
  font-family: monospace;
`;

const SubmitButton = styled(motion.button)`
  background: var(--neon-cyan);
  color: var(--deep-blue);
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  color: var(--neon-cyan);
  text-align: center;
  margin-top: 1rem;
`;

const JobRoles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const JobCard = styled(motion.div)`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid var(--neon-cyan);
  border-radius: 10px;
  padding: 1.5rem;
  opacity: ${props => props.unlocked ? 1 : 0.5};
`;

const JobTitle = styled.h3`
  color: var(--neon-cyan);
  margin-bottom: 0.5rem;
`;

const JobDescription = styled.p`
  color: var(--light-blue);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const JoinUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = () => {
    if (code === 'ALPO2024') {
      setUnlocked(true);
    }
  };

  const jobs = [
    {
      title: 'Game Developer',
      description: 'Разработка игр с использованием Unity и Unreal Engine'
    },
    {
      title: 'UI/UX Designer',
      description: 'Создание пользовательских интерфейсов для игр'
    },
    {
      title: '3D Artist',
      description: 'Создание 3D моделей и анимаций'
    }
  ];

  return (
    <JoinUsSection>
      <Container>
        <Title
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Присоединяйтесь к нам
        </Title>

        <ChallengeContainer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ChallengeTitle>Разгадайте код</ChallengeTitle>
          <ChallengeDescription>
            Введите секретный код, чтобы увидеть открытые вакансии
          </ChallengeDescription>
          <CodeInput
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Введите код..."
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={!code}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Разгадать
          </SubmitButton>
          {unlocked && (
            <SuccessMessage
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Поздравляем! Код разгадан!
            </SuccessMessage>
          )}
        </ChallengeContainer>

        <JobRoles>
          {jobs.map((job, index) => (
            <JobCard
              key={job.title}
              unlocked={unlocked}
              initial={{ opacity: 0, y: 20 }}
              animate={inView && unlocked ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <JobTitle>{job.title}</JobTitle>
              <JobDescription>{job.description}</JobDescription>
            </JobCard>
          ))}
        </JobRoles>
      </Container>
    </JoinUsSection>
  );
};

export default JoinUs; 