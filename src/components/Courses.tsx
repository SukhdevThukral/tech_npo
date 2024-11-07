import React from 'react';
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const courses = [
  {
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript through hands-on projects",
    duration: "8 weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    topics: ["HTML5", "CSS3", "JavaScript", "Git"]
  },
  {
    title: "Python Programming",
    description: "Learn Python from scratch with real-world applications",
    duration: "10 weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    topics: ["Python", "Data Structures", "APIs", "OOP"]
  },
  {
    title: "Full Stack Development",
    description: "Build complete web applications from front to back",
    duration: "12 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    topics: ["React", "Node.js", "MongoDB", "AWS"]
  }
];

export default function Courses() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="courses" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white/50 pointer-events-none"></div>
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div 
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Free Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality education shouldn't come with a price tag. Our courses are crafted by students, 
            for students, and will always be free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group hover-trigger bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.topics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    100% Free
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-50 text-indigo-600 py-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}