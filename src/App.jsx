import { useState, useEffect } from "react";
import logoGambar from "./assets/pinkandblue-removebg-preview.png";
import {
  ShieldAlert,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Share2,
  Map,
  Users,
  ArrowLeft,
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [score, setScore] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [archiveError, setArchiveError] = useState("");
  const [copied, setCopied] = useState(false);

  // Efek Glitch sesekali
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Daftar pertanyaan kuis sudah dirapikan (kembali menjadi 3 pertanyaan)
  const quizQuestions = [
    {
      question:
        "Siapa yang paling pantas memimpin rapat perencanaan tata kota Equal Village?",
      options: [
        { text: "Pria (Karena lebih logis dan tegas)", isStereotype: true },
        {
          text: "Wanita (Karena lebih teliti dan mengayomi)",
          isStereotype: true,
        },
        {
          text: "Siapapun yang memiliki kapabilitas terbaik",
          isStereotype: false,
        },
      ],
    },
    {
      question:
        "Dalam pembagian zona, siapa yang seharusnya menempati Pink District (Sektor Domestik & Kreatif)?",
      options: [
        { text: "Wanita (Sudah kodratnya di sana)", isStereotype: true },
        {
          text: "Pria (Untuk memberi mereka ruang bersantai)",
          isStereotype: true,
        },
        {
          text: "Bebas, tidak ada batasan gender untuk sektor apapun",
          isStereotype: false,
        },
      ],
    },
    {
      question:
        "Bagaimana cara terbaik membagi gaji di sektor teknologi (STEM) Equal Village?",
      options: [
        {
          text: "Sesuai standar saat ini (Pria +28% lebih tinggi)",
          isStereotype: true,
        },
        {
          text: "Sesuai kontribusi, tanpa melihat gender",
          isStereotype: false,
        },
        { text: "Sesuai kebutuhan biologis masing-masing", isStereotype: true },
      ],
    },
    {
      question:
        "Bagaimana sebaiknya kuota keterwakilan perempuan dalam dewan parlemen tinggi Equal Village diatur?",
      options: [
        {
          text: "Dibatasi maksimal 21,9% demi menjaga stabilitas alamiah desa",
          isStereotype: true,
        },
        {
          text: "Diisi oleh pria saja karena urusan politik adalah area publik",
          isStereotype: true,
        },
        {
          text: "Terbuka setara bagi siapapun berdasarkan kompetensi tanpa batasan sekat gender",
          isStereotype: false,
        },
      ],
    },
    {
      question:
        "Bagaimana tanggung jawab pengasuhan anak dan tugas domestik keluarga yang ideal di Equal Village?",
      options: [
        {
          text: "Tugas mutlak wanita di Pink District agar pria fokus memimpin di Blue Zone",
          isStereotype: true,
        },
        {
          text: "Dijalankan secara seimbang dan fleksibel oleh kedua pihak tanpa sekat peran",
          isStereotype: false,
        },
        {
          text: "Pria hanya membantu jika ada waktu luang di luar jam kerja industri",
          isStereotype: true,
        },
      ],
    },
  ];

  const handleAnswer = (isStereotype) => {
    if (isStereotype) setScore(score + 1);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setCurrentView("result");
    }
  };

  const handleArchiveUnlock = (e) => {
    e.preventDefault();
    if (
      passwordInput === "504" ||
      passwordInput.toLowerCase() === "pasal 504"
    ) {
      setIsUnlocked(true);
      setArchiveError("");
    } else {
      setArchiveError(
        "Akses Ditolak. Silakan periksa kembali petunjuk di pameran.",
      );
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center space-y-8 animate-fade-in w-full overflow-x-hidden">
      <div className="bg-white/80 p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-2xl border-4 border-white backdrop-blur-sm mx-4">
        <h1
          className={`text-3xl sm:text-5xl font-extrabold mb-4 transition-colors duration-200 break-words px-2 leading-tight pb-2 ${
            glitchActive
              ? "text-red-600"
              : "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500"
          }`}
        >
          Selamat Datang di Equal Village
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-6 font-medium">
          Kota paling ideal, harmonis, dan 100% warganya berbahagia. Di sini,
          biru adalah biru, pink adalah pink. Semua tertata sesuai porsinya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 w-full">
          <div className="bg-blue-100 p-6 rounded-2xl border-2 border-blue-300 w-full">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <h3 className="text-blue-800 font-bold text-xl">Blue Zone</h3>
            <p className="text-blue-600 text-xs mt-2">
              Pusat Logika, Kepemimpinan & Industri.
            </p>
          </div>
          <div className="bg-pink-100 p-6 rounded-2xl border-2 border-pink-300 w-full">
            <Map className="w-12 h-12 text-pink-500 mx-auto mb-2" />
            <h3 className="text-pink-800 font-bold text-xl">Pink District</h3>
            <p className="text-pink-600 text-xs mt-2">
              Pusat Harmoni, Estetika & Domestik.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView("quiz")}
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 text-lg"
        >
          Ambil Tes "EQ Meter" Warga Baru
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="flex flex-col items-center justify-center p-8 min-h-[60vh] animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full border-t-8 border-pink-400">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-bold text-gray-400">
            Evaluasi Warga
          </span>
          <span className="text-sm font-bold text-blue-500">
            Pertanyaan {quizStep + 1}/{quizQuestions.length}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
          {quizQuestions[quizStep].question}
        </h2>
        <div className="space-y-4">
          {quizQuestions[quizStep].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.isStereotype)}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition-all font-medium text-gray-700 hover:text-pink-700 shadow-sm"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResult = () => {
    return (
      <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative overflow-hidden border-8 border-white">
          <div
            className={`absolute top-0 left-0 w-full h-4 ${
              score <= 1
                ? "bg-gradient-to-r from-blue-400 to-pink-400"
                : score >= 2 && score <= 3 ? "bg-gray-500"
                : "bg-red-500"
            }`}
          ></div>

          <h2 className="text-3xl font-extrabold mt-4 mb-2">
            Bias Report Card
          </h2>
          <p className="text-gray-500 mb-6 font-medium">
            KTP Warga Equal Village
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="text-6xl font-black mb-2 flex justify-center items-center">
              {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">
              Tingkat Bias Gender
            </p>
          </div>

          {score <= 1 ? (
            <div className="text-green-600 bg-green-50 p-4 rounded-xl mb-6">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold">Selamat! Anda warga yang "Sempurna".</p>
              <p className="text-sm mt-1">
                Anda sangat mematuhi stereotip desa kami.
              </p>
            </div>
          ) : score >= 2 && score <= 3 ? (
            <div className="text-gray-600 bg-gray-100 p-4 rounded-xl mb-6">
              <p className="font-bold">Ayo Ubah Pola Pikir Mu!</p>
              <p className="text-sm mt-1">
                Wahh kamu dibatas bias gender, Ayoo kamu bisa lawan bias gender ini !!
              </p>
            </div>
          ) : (
            <div className="text-red-600 bg-red-50 p-4 rounded-xl mb-6">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
              <p className="font-bold">Peringatan Anomali!</p>
              <p className="text-sm mt-1">
                Pola pikir Anda membahayakan "harmoni" pemisahan gender desa
                ini.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              const text = `Tingkat bias gender saya adalah ${Math.round(
                (score / 3) * 100,
              )}% menurut Equal Village. Berani cek bias kamu? #EqualVillageAudit`;

              // Disalin secara otomatis (tanpa pop up alert yang berpotensi error)
              navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
            className={`w-full text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors ${copied ? "bg-green-600" : "bg-black hover:bg-gray-800"}`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-5 h-5" /> Teks Tersalin!
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" /> Bagikan ke IG / TikTok
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderArchive = () => (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="bg-gray-900 text-green-400 p-8 rounded-lg shadow-2xl max-w-3xl w-full border border-gray-700 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-700 pb-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-red-500 tracking-wider">
              ARSIP RAHASIA DESA
            </h2>
          </div>

          <button
            onClick={() => {
              setCurrentView("home");
              setScore(0);
              setQuizStep(0);
              setArchiveError("");
            }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 py-2 px-4 rounded transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleArchiveUnlock} className="space-y-6">
            <p className="text-gray-400">
              SISTEM TERKUNCI. Membutuhkan kode akses fisik dari buku panduan
              yang disensor pada pameran atau dari ujung area Engklek.
            </p>
            <div>
              <label className="block text-xs mb-2 text-green-600 font-bold">
                INPUT SANDI [PASAL ___] :
              </label>
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setArchiveError(""); // hapus pesan error saat user mulai mengetik ulang
                }}
                className="w-full bg-black border border-green-500 p-3 rounded text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan 3 digit kode"
              />
              {archiveError && (
                <p className="text-red-500 text-sm mt-2 font-bold bg-red-900/30 p-2 rounded">
                  {archiveError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-black font-bold py-2 px-6 rounded hover:bg-green-500 flex items-center gap-2 transition-colors"
            >
              <Unlock className="w-4 h-4" /> Buka Enkripsi
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <p className="text-white bg-red-600 inline-block px-2 py-1 text-sm font-bold">
              AKSES DIBERIKAN. MEMUAT DATA SEBENARNYA...
            </p>

            <div className="space-y-4 text-sm bg-black p-4 rounded border border-gray-800">
              <p>
                <span className="text-red-400 font-bold">
                  [DATA ILO 2022_REDACTED]:
                </span>{" "}
                Perempuan secara global masih dibayar rata-rata 20% lebih rendah
                dari laki-laki untuk pekerjaan setara. Di sektor teknologi (Blue
                Zone), kesenjangan ini mencapai 28%.
              </p>
              <p>
                <span className="text-red-400 font-bold">
                  [DATA BPS_REDACTED]:
                </span>{" "}
                Di Indonesia, upah rata-rata perempuan hanya 78,7% dari upah
                laki-laki.
              </p>
              <p>
                <span className="text-red-400 font-bold">
                  [PASAL 504 ASLI]:
                </span>{" "}
                "Setiap warga harus bertindak sesuai warna yang diberikan sejak
                lahir. Representasi perempuan di parlemen desa dijaga agar tidak
                melebihi 21,9% (Sesuai realita DPR RI 2024)."
              </p>
            </div>

            <div className="text-yellow-400 mt-4 border-l-4 border-yellow-400 pl-4 bg-yellow-900/20 p-3 rounded-r">
              <p className="font-bold mb-1">
                Pesan dari pemberontak Barbinala & Kenandra:
              </p>
              <p>
                "Kota ini tidak setara. Mereka memanipulasi kita dengan estetika
                pastel yang rapi. Sebarkan kebenaran ini!"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 overflow-x-hidden ${
        currentView === "archive"
          ? "bg-black"
          : "bg-gradient-to-br from-pink-100 via-white to-blue-100"
      }`}
    >
      <nav
        className={`p-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 h-15 ${
          currentView === "archive"
            ? "bg-gray-900/90 border-b border-gray-800"
            : "bg-white/60 shadow-sm"
        }`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            setCurrentView("home");
            setScore(0);
            setQuizStep(0);
          }}
        >
          <div className={currentView === "archive" ? "w-0" : "w-16"}>
            <img src={logoGambar} alt="logoblueandpink" />
          </div>
          <span
            className={`font-black text-xl tracking-tighter ${
              currentView === "archive" ? "text-gray-300" : "text-pink-500"
            }`}
          >
            EQUAL
            <span
              className={
                currentView === "archive" ? "text-green-500" : "text-blue-500"
              }
            >
              VILLAGE
            </span>
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView("archive")}
            className={`flex items-center gap-1 text-sm font-bold transition-colors ${
              currentView === "archive"
                ? "text-red-400"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {isUnlocked ? (
              <Unlock className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            Arsip Rahasia
          </button>
        </div>
      </nav>

      <main className="pb-12">
        {currentView === "home" && renderHome()}
        {currentView === "quiz" && renderQuiz()}
        {currentView === "result" && renderResult()}
        {currentView === "archive" && renderArchive()}
      </main>

      {/* Style global untuk animasi fade-in yang mulus */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}
