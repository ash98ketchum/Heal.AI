import  { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle, CheckCircle, Image, RefreshCw, Info } from 'lucide-react';

const ImageUploader: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (jpg, png, etc.)');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    
    // Create a preview URL for the image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setAnalysisResult(null);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });
  
  const handleAnalyzeImage = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        condition: 'Possible Skin Rash',
        confidence: 78,
        description: 'The image appears to show symptoms consistent with a common skin rash. This could be contact dermatitis, eczema, or a mild allergic reaction.',
        recommendations: [
          'Keep the area clean and dry',
          'Avoid scratching the affected area',
          'Apply a cold compress to reduce inflammation',
          'Consider over-the-counter hydrocortisone cream',
          'Consult with a dermatologist if the rash persists or worsens'
        ]
      };
      
      setAnalysisResult(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const resetUpload = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setError(null);
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
            <Upload className="h-8 w-8 text-teal-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Symptom Image Analysis</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload an image of a visible symptom for AI-powered analysis. 
            Our technology can help identify skin conditions, rashes, eye issues, and more.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Symptom Image</h2>
            
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            {/* Upload area */}
            {!uploadedImage ? (
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragActive 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-50">
                  <Image size={32} className="text-teal-500" />
                </div>
                {isDragActive ? (
                  <p className="text-teal-600 font-medium">Drop the image here...</p>
                ) : (
                  <div>
                    <p className="text-gray-700 font-medium mb-2">Drag and drop an image here, or click to select</p>
                    <p className="text-gray-500 text-sm">
                      Supported formats: JPG, PNG, GIF (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Uploaded Image</h3>
                  <button 
                    onClick={resetUpload}
                    className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                  >
                    <RefreshCw size={16} className="mr-1" />
                    Upload another
                  </button>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded symptom" 
                    className="w-full max-h-96 object-contain bg-gray-50"
                  />
                </div>
                
                {!analysisResult && !isAnalyzing && (
                  <div className="mt-4">
                    <button 
                      onClick={handleAnalyzeImage}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors w-full"
                    >
                      Analyze Image
                    </button>
                  </div>
                )}
                
                {/* Loading state */}
                {isAnalyzing && (
                  <div className="mt-6 flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Analyzing your image...</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Analysis Results */}
            {analysisResult && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Results</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-teal-800">{analysisResult.condition}</h4>
                    <div className="bg-teal-100 px-3 py-1 rounded-full text-sm font-medium text-teal-800">
                      {analysisResult.confidence}% match
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{analysisResult.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={18} className="text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info size={20} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800">What to do next?</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        This analysis is provided for informational purposes only and should not replace professional medical advice. 
                        If you're concerned about your symptoms, please consult with a healthcare provider.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Best Practices",
              icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
              content: "For best results, take well-lit photos in natural light. Focus on the affected area and include surrounding healthy skin for comparison."
            },
            {
              title: "Privacy Assurance",
              icon: <Shield className="h-6 w-6 text-indigo-600" />,
              content: "Your uploaded images are encrypted and not stored permanently. We prioritize your privacy and data security."
            },
            {
              title: "Limitations",
              icon: <AlertCircle className="h-6 w-6 text-amber-600" />,
              content: "Our AI can analyze visible symptoms only. Internal conditions, complex medical issues, or emergencies require immediate medical attention."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-3">
                {item.icon}
                <h3 className="font-semibold ml-2">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Medical Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle size={20} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-amber-800 font-medium">Important Medical Disclaimer</h3>
              <p className="text-amber-700 text-sm mt-1">
                The image analysis provided by this tool is not a medical diagnosis. It is designed to offer preliminary insights only. 
                For proper diagnosis and treatment, always consult with a qualified healthcare professional. If you're experiencing severe 
                symptoms, seek immediate medical attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Declared but not used in the component
const Shield: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export default ImageUploader;