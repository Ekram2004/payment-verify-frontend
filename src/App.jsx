import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  User,
  Phone,
  Landmark,
  QrCode,
  Printer,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import VerifyPage from "./VerifyPage";

const API_BASE = import.meta.env.VITE_API_BASE;


const Dashboard = () => {
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    telebirrAccount: "",
    cbeAccount: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a slight delay for a "premium" feel
    setTimeout(async () => {
      try {
        const res = await axios.post(`${API_BASE}/api/businesses`, form);
        setResult(res.data);
      } catch (err) {
        console.error("Error creating business");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0F172A] text-slate-200 selection:bg-sky-500/30">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-slate-700/50">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/10 rounded-2xl mb-4 border border-sky-500/20">
              <ShieldCheck className="w-8 h-8 text-sky-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Ethio<span className="text-sky-400">Verify</span>Pay
            </h1>
            <p className="text-slate-400 font-medium">
              Generate secure merchant verification
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <InputField
                  icon={<Building2 />}
                  placeholder="Business Name"
                  onChange={(val) => setForm({ ...form, businessName: val })}
                />
                <InputField
                  icon={<User />}
                  placeholder="Owner Full Name"
                  onChange={(val) => setForm({ ...form, ownerName: val })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    icon={<Phone />}
                    placeholder="Telebirr #"
                    onChange={(val) =>
                      setForm({ ...form, telebirrAccount: val })
                    }
                  />
                  <InputField
                    icon={<Landmark />}
                    placeholder="CBE Account"
                    onChange={(val) => setForm({ ...form, cbeAccount: val })}
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" />
                  ) : (
                    <QrCode className="group-hover:rotate-12 transition-transform" />
                  )}
                  {loading ? "Processing..." : "Generate Merchant QR"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                {/* The "Physical" Card look for the QR */}
                <div className="bg-white p-6 rounded-3xl inline-block shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-8 border-slate-100">
                  <QRCode
                    value={`https://payment-verify-frontend.vercel.app/verify/${result.verificationCode}`}
                    size={200}
                    level="H"
                  />
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-800 font-bold uppercase tracking-widest text-xs">
                    Verified Merchant
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-slate-100 text-slate-900 font-bold py-3 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Printer size={20} /> Print Business Flyer
                  </button>

                  <button
                    onClick={() => setResult(null)}
                    className="text-slate-400 hover:text-white text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
                  >
                    <RefreshCw size={14} /> Create New Profile
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Fancy Input Component
const InputField = ({ icon, placeholder, onChange }) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input
      required
      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/10 text-white placeholder:text-slate-600 transition-all"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/verify/:code" element={<VerifyPage />} />
    </Routes>
  );
}

export default App;
