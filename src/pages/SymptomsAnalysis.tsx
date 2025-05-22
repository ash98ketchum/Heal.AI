import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, CheckCircle, AlertCircle, X } from 'lucide-react';

interface AnalysisResults {
  condition: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

const SymptomsAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Sore Throat',
    'Shortness of Breath', 'Muscle Pain', 'Loss of Taste or Smell',
    'Nausea', 'Diarrhea', 'Chest Pain', 'Runny Nose', 'Dizziness',
    'Abdominal Pain', 'Rash', 'Joint Pain', 'Chills', 'Vomiting'
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
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

  const performAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms, duration, severity })
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data: AnalysisResults = await response.json();
      setAnalysisResults(data);
      setCurrentStep(4);
    } catch (error) {
      console.error('Prediction error:', error);
      // Optionally show a user-friendly error message here.
    } finally {
      setLoading(false);
    }
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
            This is not a substitute for professional medical advice.
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

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Step 1: Select Symptoms */}
          {currentStep === 1 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">What symptoms are you experiencing?</h2>
              <p className="text-gray-600 mb-6">
                Select all that apply. You can add custom symptoms if yours isn't listed.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"> 
                {commonSymptoms.map(symptom => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button disabled className="px-4 py-2 rounded-md bg-gray-100 text-gray-400">
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedSymptoms.length === 0}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    selectedSymptoms.length === 0
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  Next <ChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Duration */}
          {currentStep === 2 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                How long have you been experiencing these symptoms?
              </h2>
              <div className="space-y-3 mb-6">
                {['Less than 24 hours', '1-3 days', '4-7 days', '1-2 weeks', 'More than 2 weeks'].map(option => (
                  <button
                    key={option}
                    onClick={() => setDuration(option)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      duration === option
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {duration === option && <CheckCircle className="text-teal-600" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!duration}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    !duration
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  Next <ChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Severity */}
          {currentStep === 3 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">How severe are your symptoms?</h2>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Mild', value: 'Mild' },
                  { label: 'Moderate', value: 'Moderate' },
                  { label: 'Severe', value: 'Severe' },
                  { label: 'Very Severe', value: 'Very Severe' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSeverity(opt.value)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      severity === opt.value
                        ? 'bg-teal-100 border-2 border-teal-500 text-teal-800'
                        : 'bg-gray-100 border-2 border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{opt.label}</span>
                      {severity === opt.value && <CheckCircle className="text-teal-600" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!severity}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    !severity
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  Analyze Symptoms <ChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Activity className="animate-spin h-12 w-12 text-teal-600 mb-4" />
              <p className="text-gray-600">Processing your symptoms, please wait...</p>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && analysisResults && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Symptom Analysis Results</h2>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Possible Condition</h3>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-teal-800">
                      {analysisResults.condition}
                    </span>
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
                  {analysisResults.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertCircle className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-amber-800 font-medium">Important Disclaimer</h3>
                    <p className="text-amber-700 text-sm mt-1">
                      This analysis is based on the symptoms you reported and is meant for informational purposes only.
                      It is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetAnalysis}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Start New Analysis
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need immediate assistance?{' '}
            <a href="#" className="text-teal-600 hover:underline">
              Contact a healthcare professional
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SymptomsAnalysis;
