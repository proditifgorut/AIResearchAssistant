import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <p className="text-lg font-semibold">AI Research Assistant</p>
          </div>
          <p className="text-gray-400">
            Membantu peneliti dalam pengembangan naskah ilmiah dengan teknologi AI
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>menggunakan Gemini AI</span>
          </div>
          <div className="text-xs text-gray-500">
            © 2025 AI Research Assistant. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
