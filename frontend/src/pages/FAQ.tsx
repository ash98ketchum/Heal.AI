import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Search, CheckCircle, AlertCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const faqData: FAQItem[] = [
    {
      question: "What is heal.ai and how does it work?",
      answer: "HealthAssist is an AI-powered health companion that helps you understand and manage your health. It offers symptom analysis, a health chatbot for immediate guidance, image analysis for visible symptoms, and comprehensive health information through our FAQ section. The platform uses advanced algorithms trained on medical data to provide personalized health insights.",
      category: "general"
    },
    {
      question: "Is heal.ai a substitute for professional medical advice?",
      answer: "No, HealthAssist is not a substitute for professional medical advice, diagnosis, or treatment. While our tools provide helpful health information and insights, they should be used as a complement to, not a replacement for, consultation with qualified healthcare providers. Always consult with a medical professional for health concerns.",
      category: "general"
    },
    {
      question: "How accurate is the symptom analysis feature?",
      answer: "Our symptom analysis uses advanced algorithms trained on medical data to provide possible causes for your symptoms. However, it has limitations and typically achieves 70-85% accuracy in suggesting potential conditions. Many factors affect accuracy, including symptom complexity, how symptoms are reported, and individual health variations. Always consult with a healthcare professional for diagnosis.",
      category: "symptoms"
    },
    {
      question: "What types of images can I upload for analysis?",
      answer: "Our image analysis feature works best with clear, well-lit photos of visible symptoms such as skin conditions (rashes, moles, etc.), eye issues (redness, swelling), and certain external physical symptoms. The image should focus on the affected area and include some surrounding healthy tissue for comparison. Currently, we don't support X-rays, MRIs, or other medical imaging.",
      category: "images"
    },
    {
      question: "How is my health data protected?",
      answer: "We take your privacy seriously. All data transmitted to and from our servers is encrypted using industry-standard TLS/SSL protocols. Your health information is stored securely and is never sold to third parties. You can delete your data at any time from your account settings. For more details, please review our Privacy Policy.",
      category: "privacy"
    },
    {
      question: "What should I do if I'm experiencing a medical emergency?",
      answer: "If you're experiencing a medical emergency such as severe chest pain, difficulty breathing, severe bleeding, or symptoms of stroke, call your local emergency number (such as 911 in the US) immediately. Do not wait for an online assessment or response from our platform. HealthAssist is not designed for emergency situations.",
      category: "emergency"
    },
    {
      question: "Can the chatbot understand questions in languages other than English?",
      answer: "Currently, our health chatbot primarily supports English. While it may understand some queries in other major languages, the responses and accuracy will be best in English. We're working on expanding language support in future updates to make our services more accessible globally.",
      category: "chatbot"
    },
    {
      question: "How should I describe my symptoms for the most accurate analysis?",
      answer: "For the most accurate symptom analysis, be specific and comprehensive. Note when symptoms started, their severity, frequency, and any triggers or relieving factors. Mention relevant medical history and medications. Use clear, descriptive terms and avoid self-diagnosis in your description. The more complete information you provide, the better our system can analyze your symptoms.",
      category: "symptoms"
    },
    
    {
      question: "Can I share my symptom analysis results with my doctor?",
      answer: "Yes, all analysis results can be easily shared with your healthcare provider. You can generate a PDF report of your symptom analysis, chatbot conversation, or image analysis that includes all the information you've provided and the AI's assessment. This feature helps facilitate more productive conversations with your healthcare provider.",
      category: "symptoms"
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'general', name: 'General' },
    { id: 'symptoms', name: 'Symptoms Analysis' },
    { id: 'chatbot', name: 'Health Chatbot' },
    { id: 'images', name: 'Image Analysis' },
    { id: 'privacy', name: 'Privacy & Security' },
    { id: 'emergency', name: 'Emergency Information' }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container-custom max-w-4xl">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about heal.ai and general health topics.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQ..."
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 whitespace-nowrap pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                  >
                    <button
                      className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="font-medium pr-8">{faq.question}</h3>
                      {activeIndex === index ? (
                        <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-2">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No matching questions found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or category selection
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Quick Health Facts */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Quick Health Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: <CheckCircle size={20} className="text-green-600" />,
                fact: "Adults should aim for 7-9 hours of sleep per night for optimal health.",
                color: "bg-green-50 border-green-100"
              },
              {
                icon: <CheckCircle size={20} className="text-indigo-600" />,
                fact: "It's recommended to drink at least 8 glasses (64 ounces) of water daily.",
                color: "bg-indigo-50 border-indigo-100"
              },
              {
                icon: <CheckCircle size={20} className="text-amber-600" />,
                fact: "Regular exercise (150 minutes/week) can reduce risk of chronic diseases by up to 50%.",
                color: "bg-amber-50 border-amber-100"
              },
              {
                icon: <CheckCircle size={20} className="text-blue-600" />,
                fact: "Washing hands with soap for 20 seconds can reduce respiratory illnesses by 16-21%.",
                color: "bg-blue-50 border-blue-100"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${item.color} flex items-start`}
              >
                <div className="mr-3 mt-0.5 flex-shrink-0">
                  {item.icon}
                </div>
                <p>{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Health Resources */}
        {/* <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Trusted Health Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "World Health Organization",
                url: "https://www.who.int",
                description: "Global health guidance and information"
              },
              {
                title: "Centers for Disease Control",
                url: "https://www.cdc.gov",
                description: "Disease prevention and control resources"
              },
              {
                title: "National Institutes of Health",
                url: "https://www.nih.gov",
                description: "Medical research and health information"
              },
              {
                title: "Mayo Clinic",
                url: "https://www.mayoclinic.org",
                description: "Comprehensive health information and research"
              },
              {
                title: "MedlinePlus",
                url: "https://medlineplus.gov",
                description: "Reliable medical information for patients"
              },
              {
                title: "Cleveland Clinic",
                url: "https://my.clevelandclinic.org",
                description: "Health articles and medical information"
              }
            ].map((resource, index) => (
              <a 
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-teal-600 mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
         */}
        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer to your question, please don't hesitate to contact our support team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="mailto:support@heal.ai.example"
              className="flex items-center p-4 rounded-lg bg-teal-50 border border-teal-100 hover:bg-teal-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600">support@heal.ai.example</p>
              </div>
            </a>
            <a 
              href="tel:+15551234567"
              className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </a>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-amber-800 font-medium">Medical Disclaimer</h3>
                <p className="text-amber-700 text-sm mt-1">
                  The information provided on this platform is intended for general informational and educational purposes only. 
                  It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician or other qualified health provider with any questions you may have 
                  regarding a medical condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;