export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AnalysisResult {
  content: string;
  timestamp: Date;
}

export type TabType = 'home' | 'analyze' | 'literature' | 'outline' | 'citation' | 'question';
