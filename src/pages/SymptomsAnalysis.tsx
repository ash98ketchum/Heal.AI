import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, CheckCircle, AlertCircle, X } from 'lucide-react';

const SymptomsAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<null | { condition: string; confidence: number; description: string; recommendations: string[] }>(null);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Sore Throat',
    'Shortness of Breath', 'Muscle Pain', 'Loss of Taste or Smell',
    'Nausea', 'Diarrhea', 'Chest Pain', 'Runny Nose', 'Dizziness',
    'Abdominal Pain', 'Rash', 'Joint Pain', 'Chills', 'Vomiting'
  ];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      performAnalysis();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const performAnalysis = () => {
    // Simulate API call with mock data
    setTimeout(() => {
      // This would be replaced with actual API response
      const mockResults = {
        condition: selectedSymptoms.includes('Headache') && selectedSymptoms.includes('Fever') 
          ? 'Common Cold or Flu' 
          : selectedSymptoms.includes('Cough') && selectedSymptoms.includes('Shortness of Breath')
            ? 'Respiratory Infection'
            : 'General Malaise',
        confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-99%
        description: selectedSymptoms.includes('Headache') && selectedSymptoms.includes('Fever')
          ? 'Your symptoms suggest a viral infection such as a common cold or seasonal flu. These conditions are typically caused by different viruses and share many similar symptoms.'
          : selectedSymptoms.includes('Cough') && selectedSymptoms.includes('Shortness of Breath')
            ? 'Your symptoms indicate a possible respiratory infection. These can be caused by various viruses or bacteria affecting the respiratory tract.'
            : 'Based on your reported symptoms, you may be experiencing general malaise which can be associated with many different conditions.',
        recommendations: [
          'Rest and stay hydrated',
          'Monitor your symptoms for any changes',
          'Take over-the-counter pain relievers if needed',
          'Consult with a healthcare professional if symptoms worsen',
        ]
      };
      
      setAnalysisResults(mockResults);
      setCurrentStep(4);
    }, 1500);
  };

  const resetAnalysis = () => {
    setSelectedSymptoms([]);
    setDuration('');
    setSeverity('');
    setAnalysisResults(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Symptoms Analysis</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your symptoms to receive a preliminary health assessment. 
            Remember, this is not a substitute for professional medical advice.
          </p>
        </motion.div>

        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step 
                      ? 'bg-teal-600 text-white' 
                      : currentStep > step 
                        ? 'bg-teal-200 text-teal-800' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? <CheckCircle size={20} /> : step}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {step === 1 && 'Symptoms'}
                  {step === 2 && 'Duration'}
                  {step === 3 && 'Severity'}
                  {step === 4 && 'Results'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative max-w-2xl mx-auto mt-3">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-teal-600 z-10 transition-all duration-500"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Step 1: Select Symptoms */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">What symptoms are you experiencing?</h2>
              <p className="text-gray-600 mb-6">Select all that apply. You can add custom symptoms if yours isn't listed.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-gray-700 font-medium">Custom symptom:</label>
                <div className="flex mt-2">
                  <input 
                    type="text" 
                    className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter symptom"
                  />
                  <button className="bg-teal-600 text-white p-2 rounded-r-lg hover:bg-teal-700">
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Selected symptoms ({selectedSymptoms.length}):</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.length === 0 ? (
                    <p className="text-gray-500 italic">No symptoms selected</p>
                  ) : (
                    selectedSymptoms.map((symptom) => (
                      <div 
                        key={symptom} 
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center"
                      >
                        {symptom}
                        <button 
                          className="ml-2 text-teal-800 hover:text-teal-600"
                          onClick={() => toggleSymptom(symptom)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Duration */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">How long have you been experiencing these symptoms?</h2>
              <p className="text-gray-600 mb-6">Select the option that best describes the duration of your symptoms.</p>
              
              <div className="space-y-3">
                {['Less than 24 hours', '1-3 days', '4-7 days', '1-2 weeks', 'More than 2 weeks'].map((option) => (
                  <button
                    key={option}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      duration === option
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => setDuration(option)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {duration === option && <CheckCircle size={20} className="text-teal-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Severity */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">How severe are your symptoms?</h2>
              <p className="text-gray-600 mb-6">Rate the overall severity of your symptoms.</p>
              
              <div className="space-y-3">
                {[
                  { label: 'Mild - Noticeable but not interfering with daily activities', value: 'Mild' },
                  { label: 'Moderate - Somewhat interfering with daily activities', value: 'Moderate' },
                  { label: 'Severe - Significantly interfering with daily activities', value: 'Severe' },
                  { label: 'Very Severe - Unable to perform daily activities', value: 'Very Severe' }
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`w-full p-4 text-left rounded-lg transition-all ${
                      severity === option.value
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                    onClick={() => setSeverity(option.value)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{option.value}</span>
                        <p className="text-sm mt-1 text-gray-600">{option.label}</p>
                      </div>
                      {severity === option.value && <CheckCircle size={20} className="text-teal-600" />}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <p className="text-red-600 flex items-center">
                  <AlertCircle size={20} className="mr-2" />
                  If you are experiencing severe symptoms like chest pain, difficulty breathing, or severe bleeding, please seek immediate medical attention.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && analysisResults && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Symptom Analysis Results</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Possible Condition</h3>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-teal-800">{analysisResults.condition}</span>
                    <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-teal-800">
                      {analysisResults.confidence}% match
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{analysisResults.description}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Recommendations</h3>
                <ul className="bg-blue-50 p-4 rounded-lg space-y-2">
                  {analysisResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-amber-800 font-medium">Important Disclaimer</h3>
                    <p className="text-amber-700 text-sm mt-1">
                      This analysis is based on the symptoms you reported and is meant for informational purposes only. 
                      It is not a medical diagnosis. Please consult with a healthcare professional for proper evaluation and advice.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={resetAnalysis}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                >
                  Start New Analysis
                </button>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-colors">
                  Save Results
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {currentStep === 3 && analysisResults === null && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Analyzing your symptoms...</p>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="mt-8 flex justify-between">
              <button 
                onClick={handleBack}
                className={`px-4 py-2 rounded-md ${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className={`bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 flex items-center ${
                  (currentStep === 1 && selectedSymptoms.length === 0) || 
                  (currentStep === 2 && !duration) || 
                  (currentStep === 3 && !severity)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={(currentStep === 1 && selectedSymptoms.length === 0) || 
                         (currentStep === 2 && !duration) || 
                         (currentStep === 3 && !severity)}
              >
                {currentStep === 3 ? 'Analyze Symptoms' : 'Next'}
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Information Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need immediate assistance? <a href="#" className="text-teal-600 hover:underline">Contact a healthcare professional</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SymptomsAnalysis;