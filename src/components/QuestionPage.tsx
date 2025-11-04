import React, { useState } from 'react';
import { HelpCircle, Loader2, Send, Sparkles } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const QuestionPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [background, setBackground] = useState('');
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Silakan masukkan topik penelitian');
      return;
    }

    setLoading(true);
    setQuestions('');

    try {
      const prompt = `Buatkan rumusan masalah penelitian yang jelas dan fokus untuk topik: "${topic}"

${background ? `Konteks/Latar Belakang: ${background}` : ''}

Sertakan:
1. 3-5 rumusan masalah yang spesifik
2. Penjelasan mengapa setiap masalah penting
3. Saran hipotesis (jika relevan)
4. Variabel penelitian yang terkait

Format dalam bentuk yang terstruktur dan akademis.`;

      const result = await generateContent({ 
        prompt,
        systemInstruction: 'Anda adalah asisten penelitian yang ahli dalam merumuskan pertanyaan penelitian yang baik. Buat rumusan masalah yang spesifik, terukur, dan akademis dalam bahasa Indonesia. Gunakan format markdown.'
      });
      
      setQuestions(result);
    } catch (error) {
      setQuestions(`Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <HelpCircle className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">Generator Rumusan Masalah</h2>
        </div>
        <p className="text-white/90">
          Buat rumusan masalah penelitian yang jelas dan fokus
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-semibold">Topik Penelitian *</span>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Dampak Teknologi AI pada Pendidikan"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>
            
            <label className="block">
              <span className="text-gray-700 font-semibold">Konteks/Latar Belakang (opsional)</span>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="Jelaskan konteks atau latar belakang penelitian Anda..."
                className="mt-2 w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </label>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-900 mb-2">💡 Tips Rumusan Masalah:</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Harus spesifik dan terukur</li>
                <li>• Dapat dijawab melalui penelitian</li>
                <li>• Relevan dengan topik penelitian</li>
                <li>• Menggunakan kata tanya yang tepat</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Membuat Rumusan...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Buat Rumusan Masalah</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Hasil Rumusan Masalah</span>
          </div>
          <div className="bg-gray-50 rounded-lg h-[500px] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            )}
            {!loading && !questions && (
              <p className="text-gray-400 text-center flex items-center justify-center h-full">
                Hasil rumusan masalah akan muncul di sini...
              </p>
            )}
            {!loading && questions && (
              <article className="prose prose-sm max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{questions}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
