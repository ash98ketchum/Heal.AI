import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Activity, MessageSquare, Upload, HelpCircle, Stethoscope, Brain, Heart, Shield, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Activity className="w-10 h-10 text-teal-600" />,
      title: "Symptoms Analysis",
      description: "Our advanced algorithm analyzes your symptoms and provides possible causes based on medical data.",
      link: "/symptoms",
      color: "bg-teal-50 border-teal-100"
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-indigo-600" />,
      title: "AI Health Chatbot",
      description: "Get immediate responses to your health questions from our AI-powered assistant.",
      link: "/chatbot",
      color: "bg-indigo-50 border-indigo-100"
    },
    {
      icon: <Upload className="w-10 h-10 text-orange-600" />,
      title: "Image Analysis",
      description: "Upload photos of visible symptoms for AI-powered analysis and suggestions.",
      link: "/image-analysis",
      color: "bg-orange-50 border-orange-100"
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-green-600" />,
      title: "Health FAQ",
      description: "Browse through our extensive library of frequently asked health questions.",
      link: "/faq",
      color: "bg-green-50 border-green-100"
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-red-600" />,
      title: "Medication Reminders",
      description: "Set up personalized reminders for your medications and health routines.",
      link: "#",
      color: "bg-red-50 border-red-100",
      comingSoon: true
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-600" />,
      title: "Mental Health Assessment",
      description: "Check your mental wellbeing with our scientifically backed assessment tools.",
      link: "#",
      color: "bg-purple-50 border-purple-100",
      comingSoon: true
    },
    {
      icon: <Heart className="w-10 h-10 text-pink-600" />,
      title: "Health Tracker",
      description: "Monitor your vital signs, exercise, and health metrics over time.",
      link: "#",
      color: "bg-pink-50 border-pink-100",
      comingSoon: true
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-600" />,
      title: "Preventive Care",
      description: "Get personalized recommendations for preventive healthcare based on your profile.",
      link: "#",
      color: "bg-blue-50 border-blue-100",
      comingSoon: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Our Features</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive suite of health tools designed to help you make informed decisions about your wellbeing.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`rounded-xl shadow-md border ${feature.color} overflow-hidden`}
            >
              <div className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  {feature.title}
                  {feature.comingSoon && (
                    <span className="ml-2 text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-full">Coming Soon</span>
                  )}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                {feature.comingSoon ? (
                  <button 
                    className="text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </button>
                ) : (
                  <Link 
                    to={feature.link} 
                    className="flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    Try it now <ChevronRight size={16} className="ml-1" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature Highlights */}
        <div className="mt-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-800">Why Choose Our heal.ai?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Our platform is built with your health in mind, offering unique benefits you won't find elsewhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-12 h-12 text-amber-500" />,
                title: "Instant Access",
                description: "Get immediate health information and guidance without waiting for appointments."
              },
              {
                icon: <Shield className="w-12 h-12 text-teal-600" />,
                title: "Privacy Focused",
                description: "Your health data is encrypted and never shared with third parties without consent."
              },
              {
                icon: <Brain className="w-12 h-12 text-indigo-600" />,
                title: "AI-Powered Insights",
                description: "Our advanced algorithms provide personalized health recommendations based on the latest research."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium Features Section */}
        {/* <motion.div 
          className="mt-20 bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Premium Health Assistant</h2>
              <p className="mb-6 text-teal-50">
                Unlock additional features with our premium plan, including personalized health coaching, 
                priority support, and advanced health analytics.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "24/7 access to medical professionals",
                  "Personalized health improvement plans",
                  "Detailed symptom analysis reports",
                  "Family health profiles",
                  "Advanced health metrics tracking"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-teal-400 p-1 mr-3 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-teal-50 transition-colors">
                Explore Premium Features
              </button>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="h-full bg-gray-300"></div>
            </div>
          </div>
        </motion.div> */}

        {/* Testimonials */}
        <div className="mt-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-800">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Hear from people who have improved their health with our assistant.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The symptom analyzer helped me identify a condition I didn't realize I had. After consulting with my doctor, I got the treatment I needed.",
                name: "Michael J.",
                role: "Teacher"
              },
              {
                quote: "I use the chatbot almost weekly for quick health questions. It's saved me unnecessary trips to the doctor and given me peace of mind.",
                name: "Sarah L.",
                role: "Marketing Executive"
              },
              {
                quote: "The image analysis feature correctly identified my skin condition. I was able to get proper treatment much faster than I would have otherwise.",
                name: "David K.",
                role: "Software Engineer"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center p-10 bg-teal-50 rounded-xl border border-teal-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to take control of your health?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Start using our health assistant tools today and make informed decisions about your wellbeing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/symptoms" className="btn btn-primary">
              Analyze Symptoms
            </Link>
            <Link to="/chatbot" className="btn btn-outline">
              Try Health Chatbot
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;