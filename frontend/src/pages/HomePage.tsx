import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-teal-600" />,
      title: "Reliable Health Information",
      description: "Access trusted, evidence-based health information reviewed by medical professionals."
    },
    {
      icon: <Zap className="w-12 h-12 text-teal-600" />,
      title: "Instant Guidance",
      description: "Get immediate responses to your health queries through our AI-powered chatbot."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-teal-600" />,
      title: "Track Your Health",
      description: "Monitor your symptoms and health progress over time with our intuitive tools."
    },
    {
      icon: <Heart className="w-12 h-12 text-teal-600" />,
      title: "Personalized Insights",
      description: "Receive customized health recommendations based on your specific needs."
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose heal.ai?</h2>
            <p className="text-gray-600">
              We combine medical expertise with advanced technology to provide you with the best health assistant experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mx-auto mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Get started with heal.ai in just a few simple steps.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Describe Your Symptoms", description: "Input your symptoms or health concerns using our user-friendly interface." },
              { step: "2", title: "Get AI Analysis", description: "Our advanced AI algorithms analyze your input and provide personalized insights." },
              { step: "3", title: "Take Informed Action", description: "Receive recommendations and take control of your health with confidence." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600">
              Read testimonials from people who've improved their health with heal.ai.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Fitness Instructor", quote: "heal.ai has been a game-changer for me. The symptom analysis tool helps me better understand my body and improve my training regimen." },
              { name: "David Chen", role: "Software Engineer", quote: "The AI chatbot is incredibly responsive and helpful. It's like having a doctor in my pocket whenever I need quick health advice." },
              { name: "Emily Rodriguez", role: "Teacher", quote: "As someone who's always concerned about minor symptoms, heal.ai gives me peace of mind with reliable information and guidance." }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      {/* <section className="py-16 bg-teal-600 text-white">
        <div className="container-custom text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
            <p className="text-teal-100 mb-8 text-lg">
              Start using heal.ai today and make more informed decisions about your wellbeing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Get Started Now
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;