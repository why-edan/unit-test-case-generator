import { useState } from 'react';
import { generateTests } from '../services/api';

const languages = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
];

// Function to format code for display
const formatCodeForDisplay = (code) => {
  if (typeof code !== 'string') {
    return JSON.stringify(code, null, 2);
  }
  
  // Replace literal "\n" with actual newlines
  let formatted = code.replace(/\\n/g, '\n');
  
  // Replace double backslashes
  formatted = formatted.replace(/\\\\/g, '\\');
  
  return formatted;
};

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [testCases, setTestCases] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter some code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await generateTests(code, language);
      console.log('API Response:', result); // Log the response for debugging
      
      // Process the result to handle newlines
      let processedResult;
      
      // Check the structure of the response and extract test cases
      if (result && result.test_cases) {
        processedResult = result.test_cases;
      } else if (result && result.testCases) {
        processedResult = result.testCases;
      } else if (result && result.output) {
        processedResult = result.output;
      } else if (typeof result === 'string') {
        processedResult = result;
      } else {
        // If none of the above, stringify the object with proper formatting
        processedResult = JSON.stringify(result, null, 2);
      }
      
      // Ensure newlines are properly handled
      if (typeof processedResult === 'string') {
        // First, replace literal "\n" strings with actual newlines
        processedResult = processedResult.replace(/\\n/g, '\n');
        
        // Then, replace any double backslashes (which might be escaping the backslash)
        processedResult = processedResult.replace(/\\\\/g, '\\');
        
        // Log the processed result for debugging
        console.log('Processed result:', processedResult);
      }
      
      setTestCases(processedResult);
    } catch (err) {
      setError('Failed to generate test cases. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto z-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Unit Tests</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => { 
              setLanguage(e.target.value); 
              console.log('Selected language:', e.target.value); 
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 z-10"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
            Your Code
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono"
            placeholder="Paste or type your code here..."
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Generating...' : 'Generate Test Cases'}
          </button>
        </div>
      </form>
      
      {testCases && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Generated Test Cases</h3>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <pre className="font-mono text-sm" style={{ maxHeight: '500px', whiteSpace: 'pre-wrap' }}>
              {formatCodeForDisplay(testCases)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 