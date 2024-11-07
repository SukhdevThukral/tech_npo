import React, { useRef } from 'react';
import { ArrowRight, Users, Trophy, Heart, Code, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, MeshDistortMaterial, Text3D, Float } from '@react-three/drei';

function AnimatedCode({ position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.3;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position}>
        <Torus args={[1.5, 0.4, 16, 32]}>
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
          />
        </Torus>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.5}
          height={0.2}
          position={[-1, -0.25, 0]}
        >
          {'</>'}
          <meshStandardMaterial color="#4f46e5" />
        </Text3D>
      </mesh>
    </Float>
  );
}

function FloatingElements() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <AnimatedCode position={[-8, 4, -5]} />
      <AnimatedCode position={[8, -4, -2]} />
      <AnimatedCode position={[-4, -6, -3]} />
      <AnimatedCode position={[4, 6, -4]} />
    </Canvas>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [text] = useTypewriter({
    words: ['Learn.', 'Build.', 'Make an Impact.', 'Transform Lives.', 'Shape the Future.'],
    loop: true,
    delaySpeed: 2000,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={containerRef} className="relative gradient-bg min-h-screen text-white pt-20 overflow-hidden">
      <FloatingElements />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-8"
        >
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <Sparkles className="h-4 w-4 text-yellow-300 mr-2 animate-float" />
              <span className="text-sm">Student-Run Non-Profit Organization</span>
              <Sparkles className="h-4 w-4 text-yellow-300 ml-2 animate-float delay-200" />
            </motion.div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block h-20">
              {text}
              <Cursor cursorStyle="_" />
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join our passionate community of student developers. All our resources, workshops, and mentorship are 
            <span className="font-bold text-yellow-300 animate-pulse-slow"> completely free</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <span className="relative">Start Learning Free</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 border-2 border-white/80 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              <span>Join Our Discord</span>
            </motion.button>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: 10000, label: 'Student Developers', icon: Users },
              { number: 50, label: 'Free Workshops', icon: Code },
              { number: 100, label: 'Free Forever', icon: Heart, suffix: '%' },
              { number: 95, label: 'Success Rate', icon: Trophy, suffix: '%' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group hover-trigger p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center hover-target transition-transform duration-300"
                >
                  {React.createElement(stat.icon, {
                    className: 'h-8 w-8 mx-auto mb-4 text-indigo-300'
                  })}
                  <div className="text-4xl font-bold mb-2">
                    {statsInView && (
                      <CountUp
                        end={stat.number}
                        duration={2.5}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </motion.div>
    </div>
  );
}