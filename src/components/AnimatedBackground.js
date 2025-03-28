import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Particles = () => {
  const particlesRef = useRef();
  const [particles] = useState(() => {
    const particles = [];
    for (let i = 0; i < 1000; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        size: Math.random() * 0.1 + 0.05
      });
    }
    return particles;
  });

  useFrame((state) => {
    particlesRef.current.children.forEach((particle, i) => {
      const p = particles[i];
      particle.position.add(p.velocity);
      
      // Ограничиваем движение частиц
      if (Math.abs(particle.position.x) > 50) p.velocity.x *= -1;
      if (Math.abs(particle.position.y) > 50) p.velocity.y *= -1;
      if (Math.abs(particle.position.z) > 50) p.velocity.z *= -1;
    });
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 8, 8]} />
          <meshBasicMaterial color="#64FFDA" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const Wave = ({ color, speed, amplitude, frequency }) => {
  const meshRef = useRef();
  const [vertices] = useState(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    return geometry.attributes.position.array;
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      positions[i + 1] = Math.sin(x * frequency + time * speed) * amplitude +
                         Math.cos(z * frequency + time * speed) * amplitude;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
    </mesh>
  );
};

const FloatingShape = ({ color, position, rotation, scale }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.2;
    meshRef.current.position.y = Math.sin(time * 0.3) * 0.5;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={hovered ? 0.8 : 0.3}
        wireframe
      />
    </mesh>
  );
};

const AnimatedBackground = ({ colors = ['#64FFDA', '#FF6B6B', '#4ECDC4'] }) => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.7]);
  const blurAmount = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <BackgroundContainer ref={containerRef}>
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Particles />
        
        <Wave
          color={colors[0]}
          speed={0.5}
          amplitude={2}
          frequency={0.1}
        />
        <Wave
          color={colors[1]}
          speed={0.3}
          amplitude={1.5}
          frequency={0.15}
        />
        <Wave
          color={colors[2]}
          speed={0.4}
          amplitude={1}
          frequency={0.2}
        />
        
        {colors.map((color, index) => (
          <FloatingShape
            key={index}
            color={color}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            scale={Math.random() * 0.5 + 0.5}
          />
        ))}
      </Canvas>
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 