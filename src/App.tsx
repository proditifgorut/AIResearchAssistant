import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import HomePage from './components/HomePage';
import AnalyzePage from './components/AnalyzePage';
import LiteraturePage from './components/LiteraturePage';
import OutlinePage from './components/OutlinePage';
import CitationPage from './components/CitationPage';
import QuestionPage from './components/QuestionPage';
import Footer from './components/Footer';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'analyze':
        return <AnalyzePage />;
      case 'literature':
        return <LiteraturePage />;
      case 'outline':
        return <OutlinePage />;
      case 'citation':
        return <CitationPage />;
      case 'question':
        return <QuestionPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
