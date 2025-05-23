import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, CheckCircle, AlertCircle, X } from 'lucide-react';

interface AnalysisResults {
  predicted_disease: string;
}

const SymptomsAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>([]);
  const [duration, setDuration] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const commonSymptoms = [
    'anxiety and nervousness',
    'depression',
    'shortness of breath',
    'chest tightness',
    'palpitations',
    'sore throat',
    'cough',
    'nasal congestion',
    'headache',
    'fever',
    'dizziness',
    'difficulty breathing',
  ];

  const allSymptoms = [
    "abdominal cramps", "abdominal distension", "abdominal pain", "abdominal swelling", "abnormal gait", 
    "abnormal vaginal bleeding", "abscess", "acne", "acoustic trauma", "acute respiratory distress", 
    "adverse drug reaction", "agitation", "alcohol abuse", "allergic reaction", "altered mental status", 
    "amenorrhea", "anemia", "angina", "anorexia", "anxiety and nervousness", "aphasia", "arrhythmia", 
    "ascites", "aspiration", "asthma", "ataxia", "back pain", "bleeding", "blindness", "bloating", 
    "blurred vision", "bone pain", "bradycardia", "breast lump", "bruising", "burning with urination", 
    "cachexia", "chest pain", "chest tightness", "chills", "chronic fatigue", "clubbing", 
    "cognitive decline", "cold intolerance", "confusion", "congestion", "constipation", "cough", 
    "cyanosis", "dark urine", "dehydration", "delirium", "delusions", "dementia", "depression", 
    "diarrhea", "difficulty breathing", "difficulty concentrating", "difficulty swallowing", 
    "diplopia", "dizziness", "dysarthria", "dysmenorrhea", "dyspareunia", "dyspepsia", "dysphagia", 
    "dysphasia", "dyspnea", "dysuria", "ear discharge", "ear pain", "edema", "emesis", 
    "emotional lability", "epigastric pain", "epistaxis", "erythema", "excessive sweating", 
    "exophthalmos", "eye discharge", "eye pain", "facial droop", "facial pain", "fatigue", "fever", 
    "flank pain", "flatulence", "floaters", "flushing", "frequent urination", "gait disturbance", 
    "gas", "generalized weakness", "hallucinations", "halitosis", "hamartoma", "headache", 
    "heart murmur", "heart palpitations", "heartburn", "hematemesis", "hematochezia", 
    "hematuria", "hemoptysis", "hepatomegaly", "hirsutism", "hoarseness", "hot flashes", 
    "hyperactivity", "hyperhidrosis", "hyperreflexia", "hypersomnia", "hypertension", 
    "hypoesthesia", "hypoglycemia", "hypotension", "hypothermia", "hypothyroidism", 
    "icterus", "impotence", "increased appetite", "increased thirst", "incontinence", 
    "indigestion", "infections", "infertility", "insomnia", "itching", "jaundice", "joint pain", 
    "joint stiffness", "knee pain", "laryngitis", "leg cramps", "lethargy", "lightheadedness", 
    "loss of appetite", "loss of balance", "loss of consciousness", "low back pain", 
    "low blood pressure", "lower abdominal pain", "lump", "lymphadenopathy", "memory loss", 
    "menorrhagia", "metallic taste", "mid-epigastric pain", "migraines", "mouth ulcers", 
    "muscle cramps", "muscle pain", "muscle stiffness", "muscle weakness", "myalgia", 
    "nail changes", "nausea", "neck pain", "neck stiffness", "nipple discharge", "nocturia", 
    "numbness", "oral ulcers", "orthopnea", "osteoporosis", "otorrhea", "pain", "palpitations", 
    "panic attacks", "paralysis", "paresthesia", "pelvic pain", "perianal pain", "photophobia", 
    "photosensitivity", "poor appetite", "postnasal drip", "productive cough", "prolonged bleeding", 
    "pruritus", "psychosis", "rash", "rectal bleeding", "restlessness", "rhinorrhea", 
    "rigors", "runny nose", "saddle anesthesia", "scalp tenderness", "sciatica", "scoliosis", 
    "seizures", "sexual dysfunction", "shivering", "shortness of breath", "shoulder pain", 
    "sinus congestion", "sinus pain", "sinus pressure", "skin discoloration", "skin lesion", 
    "skin rash", "sleep disturbances", "slurred speech", "snoring", "sore throat", "spasms", 
    "speech difficulty", "splenomegaly", "stiff neck", "stomach pain", "straining", 
    "stress incontinence", "stridor", "stuffy nose", "sudden vision loss", "sweating", 
    "swelling", "swollen glands", "syncope", "tenderness", "testicular pain", "throat pain", 
    "tingling", "tinnitus", "tremor", "trouble sleeping", "trouble urinating", 
    "trouble walking", "unexplained weight loss", "urinary frequency", "urinary hesitancy", 
    "urinary incontinence", "urinary retention", "urinary urgency", "urination difficulty", 
    "urticaria", "vaginal discharge", "vaginal dryness", "vaginal irritation", "vertigo", 
    "visual disturbances", "vomiting", "weakness", "weight gain", "weight loss", "wheezing"
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const q = value.toLowerCase();
    if (q) {
      setFilteredSymptoms(
        allSymptoms.filter(s =>
          s.toLowerCase().includes(q) && !selectedSymptoms.includes(s)
        )
      );
    } else {
      setFilteredSymptoms([]);
    }
  };

  const handleSelectAutocomplete = (symptom: string) => {
    toggleSymptom(symptom);
    setSearchQuery('');
    setFilteredSymptoms([]);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else performAnalysis();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const performAnalysis = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms, duration, severity })
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: AnalysisResults = await res.json();
      setAnalysisResults(data);
      setCurrentStep(4);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedSymptoms([]);
    setSearchQuery('');
    setFilteredSymptoms([]);
    setDuration('');
    setSeverity('');
    setAnalysisResults(null);
    setCurrentStep(1);
  };

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
            <Activity className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Symptoms Analysis</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your symptoms to receive a preliminary health assessment.
            This is not a substitute for professional medical advice.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === step ? 'bg-teal-600 text-white'
                    : currentStep > step ? 'bg-teal-200 text-teal-800'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? <CheckCircle size={20} /> : step}
                </div>
                <span className="text-xs mt-2 text-gray-600">
                  {step === 1 ? 'Symptoms' : step === 2 ? 'Duration' : step === 3 ? 'Severity' : 'Results'}
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

        <motion.div
          className="bg-white rounded-xl shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          {currentStep === 1 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">What symptoms are you experiencing?</h2>
              <p className="text-gray-600 mb-6">Select all that apply or search below.</p>

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

              <div className="mb-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search symptoms..."
                  className="w-full p-3 rounded-md border border-gray-300"
                  onChange={e => handleSearchChange(e.target.value)}
                />
                {filteredSymptoms.length > 0 && (
                  <div className="mt-2 max-h-40 overflow-y-auto border rounded-md bg-white z-10 absolute w-full">
                    {filteredSymptoms.map(symptom => (
                      <div
                        key={symptom}
                        className="p-2 hover:bg-teal-100 cursor-pointer"
                        onClick={() => handleSelectAutocomplete(symptom)}
                      >
                        {symptom}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedSymptoms.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedSymptoms.map(s => (
                    <span
                      key={s}
                      className="bg-teal-200 text-teal-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {s}
                      <X
                        className="h-4 w-4 ml-1 cursor-pointer"
                        onClick={() => toggleSymptom(s)}
                      />
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button disabled className="px-4 py-2 rounded-md bg-gray-100 text-gray-400">Back</button>
                <button
                  onClick={handleNext}
                  disabled={selectedSymptoms.length === 0}
                  className={`${
                    selectedSymptoms.length === 0
                      ? 'bg-teal-600 opacity-50 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700'
                  } px-4 py-2 rounded-md text-white flex items-center`}
                >
                  Next <ChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">How long have you been experiencing these symptoms?</h2>
              <div className="space-y-3 mb-6">
                {[
                  'Less than 24 hours',
                  '1-3 days',
                  '4-7 days',
                  '1-2 weeks',
                  'More than 2 weeks'
                ].map(option => (
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
                <button onClick={handleBack} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Back</button>
                <button
                  onClick={handleNext}
                  disabled={!duration}
                  className={`${
                    !duration ? 'bg-teal-600 opacity-50 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                  } px-4 py-2 rounded-md text-white flex items-center`}
                >
                  Next <ChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && !loading && (
            <div>
              <h2 className="text-xl font-semibold mb-4">How severe are your symptoms?</h2>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Mild', value: 'Mild' },
                  { label: 'Moderate', value: 'Moderate' },
                  { label: 'Severe', value: 'Severe' },
                  { label: 'Very Severe', value: 'Very Severe' }
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
                    className={`${
                      !severity
                        ? 'bg-teal-600 opacity-50 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-700'
                    } px-4 py-2 rounded-md text-white flex items-center`}
                  >
                    Analyze <ChevronRight className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Results */}
            {currentStep === 4 && analysisResults && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Your Preliminary Result</h2>
                <div className="bg-teal-100 text-teal-800 p-6 rounded-lg inline-block">
                  <p className="text-lg font-medium">Predicted Condition:</p>
                  <p className="text-2xl font-bold mt-2">{analysisResults.predicted_disease}</p>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 p-4 rounded-lg mt-6 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="text-amber-600 mr-2 mt-0.5" />
                    <div>
                      <h3 className="text-amber-800 font-medium">Important Disclaimer</h3>
                      <p className="text-amber-700 text-sm mt-1">
                        This is for informational purposes only and not a substitute for medical advice.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={resetAnalysis}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Start New Analysis
                  </button>
                </div>
              </div>
            )}


            {loading && (
              <div className="flex flex-col items-center py-8">
                <Activity className="animate-spin h-12 w-12 text-teal-600 mb-4" />
                <p className="text-gray-600">Processing your symptoms, please wait...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  };

  export default SymptomsAnalysis;
