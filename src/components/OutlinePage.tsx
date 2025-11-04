import React, { useState } from 'react';
import { List, Loader2, Send, Sparkles } from 'lucide-react';
import { generateContent } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const OutlinePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [researchType, setResearchType] = useState('kuantitatif');
  const [outline, setOutline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim()) {
      alert('Silakan masukkan judul penelitian');
      return;
    }

    setLoading(true);
    setOutline('');

    try {
      const prompt = `Buatkan outline/kerangka naskah ilmiah yang lengkap dan terstruktur untuk penelitian ${researchType} dengan judul: "${title}"

Sertakan:
1. BAB I PENDAHULUAN (Latar Belakang, Rumusan Masalah, Tujuan, Manfaat)
2. BAB II TINJAUAN PUSTAKA (Teori, Penelitian Terdahulu, Kerangka Konseptual)
3. BAB III METODE PENELITIAN
4. BAB IV HASIL DAN PEMBAHASAN
5. BAB V KESIMPULAN DAN SARAN

Berikan detail sub-bab untuk setiap bagian.`;

      const result = await generateContent({ 
        prompt,
        systemInstruction: 'Anda adalah asisten penelitian yang ahli dalam menyusun outline naskah ilmiah. Buat outline yang terstruktur, lengkap, dan sesuai dengan standar akademik dalam bahasa Indonesia. Gunakan format markdown.'
      });
      
      setOutline(result);
    } catch (error) {
      setOutline(`Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-3">
          <List className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">Generator Outline Naskah</h2>
        </div>
        <p className="text-white/90">
          Buat kerangka naskah ilmiah yang terstruktur dan lengkap
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-semibold">Judul Penelitian *</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul penelitian Anda"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </label>
            
            <label className="block">
              <span className="text-gray-700 font-semibold">Jenis Penelitian</span>
              <select
                value={researchType}
                onChange={(e) => setResearchType(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="kuantitatif">Kuantitatif</option>
                <option value="kualitatif">Kualitatif</option>
                <option value="mixed-method">Mixed Method</option>
                <option value="studi-kasus">Studi Kasus</option>
                <option value="eksperimental">Eksperimental</option>
              </select>
            </label>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">📋 Informasi:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Outline akan disesuaikan dengan jenis penelitian</li>
                <li>• Termasuk semua bab standar naskah ilmiah</li>
                <li>• Detail sub-bab untuk setiap bagian</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Membuat Outline...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Buat Outline</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2 text-gray-700 font-semibold">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span>Hasil Outline</span>
          </div>
          <div className="bg-gray-50 rounded-lg h-[500px] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              </div>
            )}
            {!loading && !outline && (
              <p className="text-gray-400 text-center flex items-center justify-center h-full">
                Hasil outline akan muncul di sini...
              </p>
            )}
            {!loading && outline && (
              <article className="prose prose-sm max-w-none p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{outline}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlinePage;
