import React, { useState } from 'react';
import { fetchNutritionData } from './services/geminiService';
import { NutritionData } from './types';
import NutritionCard from './components/NutritionCard';
import { SearchIcon, UtensilsIcon, SpinnerIcon, AlertIcon } from './components/Icons';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchNutritionData(query);
      setData(result);
    } catch (err) {
      setError('Could not analyze this food. Please try a different name or be more specific.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <UtensilsIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                NutriScan AI
              </span>
            </div>
            <div className="flex items-center">
                <a href="#" className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <div className={`transition-all duration-500 ease-in-out ${data ? 'mb-12' : 'min-h-[60vh] flex flex-col justify-center items-center text-center'}`}>
            
            {!data && (
              <div className="mb-10 max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Know What You <span className="text-emerald-500">Eat</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Instantly analyze calories, macros, and nutrition facts for any food using advanced AI.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className={`w-full ${data ? 'max-w-3xl mx-auto' : 'max-w-xl mx-auto'}`}>
              <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className={`h-5 w-5 ${loading ? 'text-emerald-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-11 pr-32 py-4 bg-white border border-gray-200 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-lg shadow-sm transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed group-hover:shadow-md"
                  placeholder="e.g., Avocado Toast, Big Mac, 100g Chicken Breast..."
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
                  >
                    {loading ? (
                      <>
                        <SpinnerIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Scanning...
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </button>
                </div>
              </form>
              {!data && !loading && (
                 <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['Banana', 'Grilled Salmon', 'Oatmeal', 'Greek Yogurt'].map((item) => (
                        <button 
                            key={item}
                            onClick={() => { setQuery(item); }} 
                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:border-emerald-200 hover:text-emerald-600 transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                 </div>
              )}
            </div>
          </div>

          {/* Results Area */}
          {error && (
            <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-fade-in">
              <AlertIcon className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {data && !loading && (
            <NutritionCard data={data} />
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} NutriScan AI. Powered by Gemini.</p>
          <p className="mt-1">Nutritional values are estimates generated by AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;