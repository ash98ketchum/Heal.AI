
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, FileText, Upload, HelpCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="w-6 h-6 text-teal-600" />,
      title: 'Symptoms Analysis',
      description: 'Analyze your symptoms and get personalized health insights.',
      path: '/symptoms'
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Health Features',
      description: 'Explore our comprehensive health tools and services.',
      path: '/features'
    },
    {
      icon: <Upload className="w-6 h-6 text-orange-600" />,
      title: 'Image Analysis',
      description: 'Upload images for AI-powered symptom analysis.',
      path: '/image-analysis'
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-green-600" />,
      title: 'Health FAQ',
      description: 'Find answers to common health questions.',
      path: '/faq'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-teal-50 to-white pt-24 pb-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute right-0 top-0 h-full w-1/3 text-teal-50 transform translate-x-1/3" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,0 100,0 50,100 0,100" />
        </svg>
      </div>
      
      <div className="container-custom relative">
        {/* Hero content */}
        <motion.div 
          className="text-center max-w-3xl mx-auto pt-8 pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your <span className="text-teal-600">Health Assistant</span> for Better Wellbeing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized health insights and understand your symptoms better with our comprehensive health tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/symptoms')} 
              className="btn btn-primary px-6 py-3"
            >
              Analyze Symptoms
            </button>
            <button 
              onClick={() => navigate('/features')}
              className="btn btn-outline px-6 py-3"
            >
              Explore Features
            </button>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="card hover:border-teal-500 hover:border cursor-pointer"
              onClick={() => navigate(feature.path)}
            >
              <div className="rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        {/* <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">TRUSTED BY HEALTHCARE PROFESSIONALS</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="h-12 flex items-center justify-center grayscale">
                <div className="bg-gray-300 h-6 w-24 rounded"></div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;