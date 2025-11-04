import React from 'react';
import { Home, FileText, BookOpen, List, Quote, HelpCircle } from 'lucide-react';
import { TabType } from '../types';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'home' as TabType, label: 'Beranda', icon: Home },
  { id: 'analyze' as TabType, label: 'Analisis Naskah', icon: FileText },
  { id: 'literature' as TabType, label: 'Tinjauan Pustaka', icon: BookOpen },
  { id: 'outline' as TabType, label: 'Outline', icon: List },
  { id: 'citation' as TabType, label: 'Sitasi', icon: Quote },
  { id: 'question' as TabType, label: 'Rumusan Masalah', icon: HelpCircle },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-1 md:space-x-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 md:px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
