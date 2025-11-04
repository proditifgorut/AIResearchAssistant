import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Research Assistant</h1>
              <p className="text-sm md:text-base text-white/90">Asisten Penelitian Naskah Ilmiah</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
