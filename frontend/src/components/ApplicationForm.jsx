import { useState } from 'react';
import { Briefcase, Building, FileText, Upload, Check, X, Download } from 'lucide-react';

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    jobDescription: '',
    companyName: '',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  const [enhancedResume, setEnhancedResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({
          ...errors,
          resume: 'Please upload a PDF file'
        });
        setFileName('');
        return;
      }
      
      setFormData({
        ...formData,
        resume: file
      });
      setFileName(file.name);
      setErrors({
        ...errors,
        resume: null
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsLoading(true);
        setSubmitStatus('submitting');
        
        // Create FormData for API request
        const formDataToSend = new FormData();
        formDataToSend.append('jd', formData.jobDescription);
        formDataToSend.append('company', formData.companyName);
        formDataToSend.append('resume', formData.resume);
        
        // Send to API
        const response = await fetch("http://127.0.0.1:5000/enhance-resume", {
          method: 'POST',
          body: formDataToSend,
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        // Parse the response
        const data = await response.json();
        console.log("API Response:", data);
        console.log("Enhanced Content:", data.enhanced_content);
        
        // Store the data
        setEnhancedResume(data);
        setSubmitStatus('success');
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({
          ...errors,
          api: `Failed to enhance resume: ${error.message}. Please try again.`
        });
        setSubmitStatus('error');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleDownload = () => {
    if (!enhancedResume) return;
    
    // Convert the enhanced_content object to formatted JSON string
    const contentText = JSON.stringify(enhancedResume.enhanced_content, null, 2);
    const blob = new Blob([contentText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced-resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleReset = () => {
    setFormData({
      jobDescription: '',
      companyName: '',
      resume: null
    });
    setFileName('');
    setEnhancedResume(null);
    setSubmitStatus(null);
    setErrors({});
  };
  
  // Helper function to render the enhanced content
  const renderEnhancedContent = () => {
    console.log("Rendering with data:", enhancedResume);
  
    if (!enhancedResume || !enhancedResume.enhanced_content) {
      return <p>No enhanced content available</p>;
    }
    
    let content;
    try {
      // Try to parse if it's a string
      if (typeof enhancedResume.enhanced_content === 'string') {
        // Check if it looks like JSON
        if (enhancedResume.enhanced_content.trim().startsWith('{')) {
          content = JSON.parse(enhancedResume.enhanced_content);
        } else {
          // If not JSON, display as text
          return (
            <div className="whitespace-pre-wrap">
              {enhancedResume.enhanced_content}
            </div>
          );
        }
      } else {
        // Already an object
        content = enhancedResume.enhanced_content;
      }
      
      // Now process the structured content
      const { Skills, Experience, Projects, Achievements } = content || {};
      
      return (
        <div className="space-y-4">
          {/* Skills Section */}
          {Skills && Object.keys(Skills).length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Skills:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {Object.entries(Skills).map(([category, skillList]) => (
                  <li key={category} className="mb-1">
                    <strong>{category}:</strong> {skillList}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Experience Section */}
          {Experience && Object.keys(Experience).length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Experience:</h4>
              <ul className="list-none pl-0">
                {Object.entries(Experience).map(([role, bullets]) => (
                  <li key={role} className="mb-3">
                    <p className="font-medium text-gray-800">{role}</p>
                    <ul className="list-disc pl-5 text-gray-700">
                      {Array.isArray(bullets) ? bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      )) : <li>{bullets}</li>}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Projects Section */}
          {Projects && Object.keys(Projects).length > 0 && (
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Projects:</h4>
              <ul className="list-none pl-0">
                {Object.entries(Projects).map(([project, bullets]) => (
                  <li key={project} className="mb-3">
                    <p className="font-medium text-gray-800">{project}</p>
                    <ul className="list-disc pl-5 text-gray-700">
                      {Array.isArray(bullets) ? bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      )) : <li>{bullets}</li>}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Achievements Section */}
          {Achievements && (
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Achievements:</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {Array.isArray(Achievements) ? Achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                )) : <li>{Achievements}</li>}
              </ul>
            </div>
          )}
        </div>
      );
    } catch (error) {
      console.error("Error rendering content:", error);
      return (
        <div>
          <p>Error displaying enhanced content. Raw content:</p>
          <pre className="bg-gray-100 p-2 mt-2 overflow-auto text-xs">
            {typeof enhancedResume.enhanced_content === 'string' 
              ? enhancedResume.enhanced_content 
              : JSON.stringify(enhancedResume.enhanced_content, null, 2)}
          </pre>
        </div>
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tailor My Resume</h1>
          <p className="mt-2 text-gray-600">Enhance your resume based on the job description</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          {submitStatus === 'success' && enhancedResume ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Resume Enhanced!</h2>
              
              <div className="w-full mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Enhanced Resume:</h3>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-auto max-h-96">
                  {renderEnhancedContent()}
                </div>
                
                {enhancedResume.matching_keywords && enhancedResume.matching_keywords.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Keywords Matched:</h3>
                    <div className="flex flex-wrap gap-2">
                      {enhancedResume.matching_keywords.map((keyword, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {enhancedResume.recommendations && enhancedResume.recommendations.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">Improvements:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {enhancedResume.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download size={18} className="mr-2" />
                  Download Enhanced Resume
                </button>
                {enhancedResume.latex_code && (
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob([enhancedResume.latex_code], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'resume-latex.tex';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Download size={18} className="mr-2" />
                    Download LaTeX Code
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Another
                </button>
              </div>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <X size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
              <p className="text-red-600 text-center">
                {errors.api || "There was a problem enhancing your resume. Please try again."}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase size={18} className="text-gray-400" />
                  </div>
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows={4}
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Paste the job description here"
                    disabled={isLoading}
                  />
                </div>
                {errors.jobDescription && (
                  <p className="mt-2 text-sm text-red-600">{errors.jobDescription}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="block w-full pl-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter company name"
                    disabled={isLoading}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Upload Resume (PDF)
                </label>
                <div className="mt-1">
                  <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex justify-center">
                        <FileText size={40} className="text-gray-400" />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf"
                            className="sr-only"
                            onChange={handleFileChange}
                            disabled={isLoading}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
                {fileName && (
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <Check size={16} className="mr-1" />
                    <span>{fileName}</span>
                  </div>
                )}
                {errors.resume && (
                  <p className="mt-2 text-sm text-red-600">{errors.resume}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enhancing Resume...
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="mr-2" />
                      Enhance My Resume
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}