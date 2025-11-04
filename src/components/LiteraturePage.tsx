import React, { useState } from 'react';
import { BookOpen, Loader2, Send, Sparkles } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LiteraturePage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Silakan masukkan topik penelitian');
      return;
    }

    setLoading(true);
    setReview('');

    try {
      const prompt = `Buatkan tinjauan pustaka (literature review) untuk topik penelitian: "${topic}"
${keywords ? `Kata kunci: ${keywords}` : ''}

Sertakan:
1. Pendahuluan tentang topik
2. Teori dan konsep utama
3. Penelitian terdahulu yang relevan
4. Gap penelitian
5. Kesimpulan tinjauan pustaka`;

      const result = await generateContent({ 
        prompt,
        systemInstruction: 'Anda adalah asisten penelitian yang ahli dalam menulis tinjauan pustaka akademik. Buat tinjauan pustaka yang komprehensif, terstruktur, dan akademis dalam bahasa Indonesia. Gunakan format markdown untuk penataan.'
      });
      
      setReview(result);
    } catch (error) {
      setReview(`Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">Generator Tinjauan Pustaka</h2>
        </div>
        <p className="text-white/90">
          Buat tinjauan pustaka komprehensif untuk penelitian Anda
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
                placeholder="Contoh: Pengaruh Media Sosial terhadap Perilaku Konsumen"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </label>
            
            <label className="block">
              <span className="text-gray-700 font-semibold">Kata Kunci (opsional)</span>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Contoh: media sosial, perilaku konsumen, e-commerce"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </label>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Gunakan topik yang spesifik dan jelas</li>
                <li>• Tambahkan kata kunci untuk hasil lebih fokus</li>
                <li>• Hasil dapat Anda edit sesuai kebutuhan</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Membuat Tinjauan...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Buat Tinjauan Pustaka</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Sparkles className="w-5 h-5 text-pink-600" />
            <span>Hasil Tinjauan Pustaka</span>
          </div>
          <div className="bg-gray-50 rounded-lg h-[500px] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
              </div>
            )}
            {!loading && !review && (
              <p className="text-gray-400 text-center flex items-center justify-center h-full">
                Hasil tinjauan pustaka akan muncul di sini...
              </p>
            )}
            {!loading && review && (
              <article className="prose prose-sm max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteraturePage;
