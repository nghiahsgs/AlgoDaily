import { useState, useEffect } from 'react';

export default function Home() {
  const [problem, setProblem] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRandomProblem = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/random');
      const data = await res.json();
      setProblem(data);
      setShowSolution(false);
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomProblem();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-2xl">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Random LeetCode Problem
        </h1>
        
        {problem ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-block bg-gray-100 rounded-lg px-4 py-2 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Problem #{problem.problem.problemNumber}
                </h2>
                <h3 className="text-xl text-gray-600 mt-1">
                  {problem.problem.title.split('-').join(' ')}
                </h3>
              </div>
              
              <div className="mt-6">
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  View Problem on LeetCode
                </a>
              </div>
            </div>

            {showSolution && (
              <div className="text-center mt-6 animate-fade-in">
                <a
                  href={problem.solutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                >
                  View Solution
                </a>
              </div>
            )}

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
              <button
                onClick={fetchRandomProblem}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Next Problem
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No problems found. Please make sure the data is available.</p>
            <button
              onClick={fetchRandomProblem}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}