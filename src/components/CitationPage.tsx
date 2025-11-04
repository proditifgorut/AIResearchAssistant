import React, { useState } from 'react';
import { Quote, Loader2, Send, Sparkles } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CitationPage: React.FC = () => {
  const [sourceInfo, setSourceInfo] = useState('');
  const [citationStyle, setCitationStyle] = useState('APA');
  const [citation, setCitation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!sourceInfo.trim()) {
      alert('Silakan masukkan informasi sumber');
      return;
    }

    setLoading(true);
    setCitation('');

    try {
      const prompt = `Format sitasi berikut dalam style ${citationStyle}:

${sourceInfo}

Berikan dalam format:
1. In-text citation
2. Reference list entry

Pastikan mengikuti aturan ${citationStyle} dengan tepat.`;

      const result = await generateContent({ 
        prompt,
        systemInstruction: `Anda adalah ahli dalam formatting sitasi akademik. Format sitasi dengan tepat sesuai style ${citationStyle} dalam bahasa Indonesia dan Inggris yang sesuai. Gunakan format markdown.`
      });
      
      setCitation(result);
    } catch (error) {
      setCitation(`Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <Quote className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">Format Sitasi Otomatis</h2>
        </div>
        <p className="text-white/90">
          Format sitasi dalam berbagai style akademik dengan mudah
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-semibold">Informasi Sumber *</span>
              <textarea
                value={sourceInfo}
                onChange={(e) => setSourceInfo(e.target.value)}
                placeholder="Contoh:&#10;Penulis: John Doe&#10;Judul: Research Methods&#10;Tahun: 2023&#10;Penerbit: Academic Press&#10;Kota: New York"
                className="mt-2 w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </label>
            
            <label className="block">
              <span className="text-gray-700 font-semibold">Style Sitasi</span>
              <select
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="APA">APA 7th Edition</option>
                <option value="IEEE">IEEE</option>
                <option value="Harvard">Harvard</option>
                <option value="MLA">MLA 9th Edition</option>
                <option value="Chicago">Chicago</option>
                <option value="Vancouver">Vancouver</option>
              </select>
            </label>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">📖 Contoh Format:</h4>
              <div className="text-sm text-orange-800 space-y-2">
                <p className="font-mono bg-white p-2 rounded text-xs">
                  Penulis: Nama Penulis<br/>
                  Judul: Judul Artikel/Buku<br/>
                  Tahun: 2023<br/>
                  Jurnal/Penerbit: Nama Jurnal<br/>
                  Volume/Halaman: Vol 5, pp 10-20
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Memformat Sitasi...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Format Sitasi</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Sparkles className="w-5 h-5 text-red-600" />
            <span>Hasil Sitasi</span>
          </div>
          <div className="bg-gray-50 rounded-lg h-[500px] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            )}
            {!loading && !citation && (
              <p className="text-gray-400 text-center flex items-center justify-center h-full">
                Hasil sitasi akan muncul di sini...
              </p>
            )}
            {!loading && citation && (
              <article className="prose prose-sm max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{citation}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationPage;
