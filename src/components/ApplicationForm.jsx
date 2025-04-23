import { useState } from 'react';
import { Briefcase, Building, FileText, Upload, Check, X } from 'lucide-react';

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    jobDescription: '',
    companyName: '',
    resume: null
  });
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setSubmitStatus('submitting');
      setTimeout(() => {
        setSubmitStatus('success');
        // Reset form after success
        setTimeout(() => {
          setSubmitStatus(null);
          setFormData({
            jobDescription: '',
            companyName: '',
            resume: null
          });
          setFileName('');
        }, 3000);
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Application Portal</h1>
          <p className="mt-2 text-gray-600">Submit your application details below</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Application Submitted!</h2>
              <p className="text-gray-600 text-center">
                Your application has been successfully submitted. We'll review it shortly.
              </p>
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
                    placeholder="Describe the job you're applying for"
                    disabled={submitStatus === 'submitting'}
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
                    disabled={submitStatus === 'submitting'}
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
                            disabled={submitStatus === 'submitting'}
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
                    submitStatus === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload size={18} className="mr-2" />
                      Submit Application
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