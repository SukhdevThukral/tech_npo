import React, { useRef } from 'react';
import { Calendar, Trophy, Gift, Users, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';

function FloatingTrophies() {
  const trophies = Array.from({ length: 6 }, (_, i) => ({
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 10 - 15
    ],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    scale: Math.random() * 0.3 + 0.2
  }));

  return (
    <>
      {trophies.map((trophy, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <TorusKnot position={trophy.position} rotation={trophy.rotation} args={[1, 0.3, 128, 16]} scale={trophy.scale}>
            <MeshDistortMaterial
              color="#ffd700"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0}
              metalness={1}
            />
          </TorusKnot>
        </Float>
      ))}
    </>
  );
}

function HackathonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <FloatingTrophies />
    </Canvas>
  );
}

const upcomingHackathons = [
  {
    title: "Summer Code Fest",
    date: "June 15-17, 2024",
    prize: "$5,000",
    participants: "500+",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=600",
    tags: ["Open Source", "Innovation", "Web3"]
  },
  {
    title: "AI Innovation Challenge",
    date: "July 22-24, 2024",
    prize: "$7,500",
    participants: "300+",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
    tags: ["AI/ML", "Cloud", "Social Impact"]
  }
];

export default function Hackathons() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const { ref: hackathonsRef, inView: hackathonsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="hackathons" className="py-32 bg-gray-50 relative overflow-hidden">
      <HackathonScene />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
      
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
            className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-6"
          >
            <Trophy className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-indigo-600 text-sm">Win Prizes & Get Recognized</span>
          </motion.div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Upcoming Hackathons</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Put your skills to the test, build amazing projects, and compete with fellow students
            in our exciting hackathons
          </p>
        </motion.div>

        <div ref={hackathonsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {upcomingHackathons.map((hackathon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={hackathonsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="group hover-trigger bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <motion.div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-64 object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{hackathon.title}</h3>
                  <motion.div className="flex flex-wrap gap-2">
                    {hackathon.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600"
                    >
                      <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{hackathon.date}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600"
                    >
                      <Trophy className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>Prize Pool: {hackathon.prize}</span>
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600"
                    >
                      <Users className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{hackathon.participants} Participants</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600"
                    >
                      <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>All Skills Welcome</span>
                    </motion.div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-12 text-center relative overflow-hidden shadow-lg"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <Gift className="h-16 w-16 text-indigo-600 mx-auto mb-6 animate-float" />
            <h3 className="text-3xl font-bold mb-6">Never Miss a Hackathon</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to stay updated about future hackathons and events.
              We'll send you early access registration links!
            </p>
            <div className="max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex gap-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}