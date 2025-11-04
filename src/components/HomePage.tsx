import React from 'react';
import { Brain, FileText, BookOpen, List, Quote, HelpCircle, Zap, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Analisis Naskah',
    description: 'Dapatkan feedback mendalam tentang struktur, konten, dan kualitas naskah ilmiah Anda.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: BookOpen,
    title: 'Tinjauan Pustaka',
    description: 'Buat tinjauan pustaka komprehensif dengan ringkasan literatur yang relevan.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: List,
    title: 'Generator Outline',
    description: 'Buat kerangka naskah yang terstruktur berdasarkan topik penelitian Anda.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Quote,
    title: 'Format Sitasi',
    description: 'Format sitasi otomatis dalam berbagai style: APA, IEEE, Harvard, dan lainnya.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: HelpCircle,
    title: 'Rumusan Masalah',
    description: 'Bantu merumuskan pertanyaan penelitian yang jelas dan fokus.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Brain,
    title: 'AI-Powered',
    description: 'Didukung oleh Google Gemini AI untuk hasil yang akurat dan relevan.',
    color: 'from-pink-500 to-purple-500'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Cepat & Efisien',
    description: 'Hemat waktu dalam proses penelitian dan penulisan'
  },
  {
    icon: Shield,
    title: 'Akurat & Terpercaya',
    description: 'Didukung teknologi AI terdepan dari Google'
  },
  {
    icon: Clock,
    title: 'Tersedia 24/7',
    description: 'Akses kapan saja, di mana saja'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      <section className="text-center space-y-4">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full mb-4">
          <Brain className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Selamat Datang di AI Research Assistant
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Platform kecerdasan buatan yang membantu Anda dalam setiap tahap penelitian dan pengembangan naskah ilmiah
        </p>
      </section>

      <section>
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Fitur Unggulan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 space-y-4 border border-gray-100 hover:scale-105 duration-300"
              >
                <div className={`inline-block bg-gradient-to-r ${feature.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Mengapa Memilih Kami?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-block bg-white p-4 rounded-full shadow-md">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="text-center bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Siap Memulai?</h3>
        <p className="text-lg text-gray-600 mb-6">
          Pilih salah satu fitur di atas untuk memulai perjalanan penelitian Anda dengan bantuan AI
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
            ✨ Gratis untuk Digunakan
          </div>
          <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium">
            🚀 Hasil Instan
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
