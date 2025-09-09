import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - React Boilerplate</title>
        <meta name="description" content="Learn more about this React boilerplate project" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Boilerplate</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                This is a modern React boilerplate configured with the latest tools and best practices
                for building scalable web applications.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Features</h2>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Fast development with Vite and HMR</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Client-side routing with React Router DOM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Utility-first CSS with Tailwind</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Data fetching with TanStack Query and Axios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>SEO optimization with React Helmet Async</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Getting Started</h2>
              
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                <p className="mb-2">npm install</p>
                <p>npm run dev</p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;