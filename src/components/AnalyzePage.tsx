import React, { useState } from 'react';
import { FileText, Loader2, Send, Sparkles } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AnalyzePage: React.FC = () => {
  const [manuscript, setManuscript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!manuscript.trim()) {
      alert('Silakan masukkan teks naskah yang ingin dianalisis');
      return;
    }

    setLoading(true);
    setAnalysis('');

    try {
      const prompt = `Analisis naskah ilmiah berikut dengan detail. Berikan feedback tentang:
1. Struktur dan organisasi
2. Kejelasan argumen
3. Kualitas konten
4. Gaya penulisan
5. Saran perbaikan

Naskah:
${manuscript}`;

      const result = await generateContent({ 
        prompt,
        systemInstruction: 'Anda adalah asisten penelitian ilmiah yang ahli dalam menganalisis naskah akademik. Berikan analisis yang konstruktif dan detail dalam bahasa Indonesia, gunakan format markdown untuk penataan (seperti heading, list, bold).'
      });
      
      setAnalysis(result);
    } catch (error) {
      setAnalysis(`Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <FileText className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">Analisis Naskah Ilmiah</h2>
        </div>
        <p className="text-white/90">
          Dapatkan feedback mendalam tentang struktur, konten, dan kualitas naskah Anda
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Masukkan Naskah Anda</span>
            </span>
            <textarea
              value={manuscript}
              onChange={(e) => setManuscript(e.target.value)}
              placeholder="Tempel atau ketik naskah ilmiah Anda di sini..."
              className="mt-2 w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </label>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Menganalisis...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Analisis Naskah</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Hasil Analisis</span>
          </div>
          <div className="bg-gray-50 rounded-lg h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            )}
            {!loading && !analysis && (
              <p className="text-gray-400 text-center flex items-center justify-center h-full">
                Hasil analisis akan muncul di sini...
              </p>
            )}
            {!loading && analysis && (
              <article className="prose prose-sm max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
