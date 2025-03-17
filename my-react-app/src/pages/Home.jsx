import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CodeEditor from '../components/CodeEditor';

export default function Home() {
  const { currentUser } = useAuth();
  
  return (
    <div className="bg-white z-0 relative">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        
        
        <div className="mx-auto max-w-2xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Automated Unit Test Generation
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              GenTest helps you create comprehensive unit tests for your code in seconds. 
              Save time and improve code quality with AI-powered test generation.
            </p>
            {!currentUser && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/login"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
                <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Code Editor Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentUser ? (
            <CodeEditor />
          ) : (
            <div className="text-center py-12 items-center align-middle">
              <h2 className="text-2xl font-bold text-gray-900">Sign in to generate test cases</h2>
              <p className="mt-4 text-gray-600">
                Create an account or sign in to start generating unit tests for your code.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-start px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 