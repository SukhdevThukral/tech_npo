import React, { useRef } from 'react';
import { MessageSquare, Users, Heart, Zap, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, MeshWobbleMaterial, Sphere } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';

function FloatingOrbs({ count = 15 }) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 10 - 15
    ],
    scale: Math.random() * 0.5 + 0.5,
    speed: Math.random() * 0.2 + 0.1
  }));

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere position={orb.position} args={[orb.scale, 16, 16]}>
            <MeshWobbleMaterial
              color="#4f46e5"
              factor={0.4}
              speed={0.5}
              transparent
              opacity={0.2}
            />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

function CommunityScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingOrbs />
    </Canvas>
  );
}

export default function Community() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: MessageSquare,
      title: "24/7 Discord Community",
      description: "Get help anytime, anywhere from our active community of learners"
    },
    {
      icon: Users,
      title: "Peer Learning Groups",
      description: "Join study groups and practice with fellow students"
    },
    {
      icon: Heart,
      title: "Student Mentorship",
      description: "Learn from experienced student developers who've been in your shoes"
    }
  ];

  return (
    <section id="community" className="py-32 gradient-bg relative overflow-hidden">
      <CommunityScene />
      <div className="absolute inset-0 bg-black/20"></div>
      
      <motion.div 
        ref={containerRef}
        style={{ y, opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
          >
            <Zap className="h-4 w-4 text-yellow-300 mr-2" />
            <span className="text-white text-sm">Join 10,000+ Student Developers</span>
          </motion.div>
          
          <h2 className="text-5xl font-bold text-white mb-6">More Than Just a Community</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Connect with fellow student developers, share your journey, and grow together in our 
            supportive community
          </p>
        </motion.div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
              className="group hover-trigger bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <feature.icon className="h-12 w-12 text-indigo-300 mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our Discord community where thousands of student developers are learning, 
              sharing, and building together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              <span>Join Discord Community</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}