import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Copy,
  Smartphone,
  Landmark,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

function VerifyPage() {
  const [amount, setAmount] = useState("");
  const { code } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/businesses/${code}`);
        setBusiness(res.data);
      } catch (err) {
        console.error("Business not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [code]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingScreen />;
  if (!business) return <ErrorScreen />;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-slate-800/40 backdrop-blur-2xl border border-slate-700/50 rounded-[2.5rem] p-8 shadow-2xl">
          {/* Header & Verification Badge */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20 relative"
            >
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-emerald-500/20 rounded-full filter blur-md"
              />
            </motion.div>
            <h2 className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-1">
              Verified Merchant
            </h2>
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {business.businessName}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Merchant ID: {code.toUpperCase()}
            </p>
          </div>

          {/* Amount Input Section */}
          <div className="mb-10 relative">
            <label className="block text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Enter Payment Amount
            </label>
            <div className="relative flex items-center justify-center group">
              <span className="absolute left-12 text-2xl font-bold text-slate-500 group-focus-within:text-sky-400 transition-colors">
                ETB
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900/40 border-2 border-slate-700 focus:border-sky-500/50 rounded-2xl py-6 px-4 text-center text-4xl font-bold text-white outline-none transition-all placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Telebirr Card */}
            {business.telebirrAccount && (
              <PaymentCard
                label="Telebirr"
                icon={<Smartphone size={18} />}
                account={business.telebirrAccount}
                color="bg-sky-500"
                textColor="text-sky-400"
                ussd={`tel:*127*1*${business.telebirrAccount}*${
                  amount || "0"
                }%23`}
                onCopy={() => copyToClipboard(business.telebirrAccount)}
                buttonText="Pay with Telebirr USSD"
              />
            )}

            {/* CBE Card */}
            {business.cbeAccount && (
              <PaymentCard
                label="Commercial Bank (CBE)"
                icon={<Landmark size={18} />}
                account={business.cbeAccount}
                color="bg-purple-600"
                textColor="text-purple-400"
                ussd={`tel:*889%23`}
                onCopy={() => copyToClipboard(business.cbeAccount)}
                buttonText="Dial CBE *889#"
              />
            )}
          </div>

          {/* Footer Safety Tag */}
          <div className="mt-10 flex items-start gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
            <AlertCircle className="text-slate-500 shrink-0" size={18} />
            <p className="text-[11px] text-slate-500 leading-relaxed uppercase tracking-wider">
              Verify the name{" "}
              <span className="text-slate-300 font-bold">
                {business.ownerName}
              </span>{" "}
              matches your bank app's recipient before confirming payment.
            </p>
          </div>
        </div>

        {/* Copy Feedback Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Copied to Clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Sub-component for Payment Options
const PaymentCard = ({
  label,
  icon,
  account,
  color,
  textColor,
  ussd,
  onCopy,
  buttonText,
}) => (
  <div className="bg-slate-900/60 border border-slate-700/50 rounded-3xl p-5 transition-all hover:border-slate-600">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-1 ${textColor} flex items-center gap-1.5`}
        >
          {icon} {label}
        </p>
        <p className="text-2xl font-mono text-white tracking-wider">
          {account}
        </p>
      </div>
      <button
        onClick={onCopy}
        className="p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
      >
        <Copy size={18} />
      </button>
    </div>
    <a
      href={ussd}
      className={`block w-full text-center ${color} text-white font-bold py-4 rounded-2xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2`}
    >
      {buttonText} <ArrowRight size={18} />
    </a>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
    <p className="text-sky-400 font-bold animate-pulse">
      Verifying Merchant...
    </p>
  </div>
);

const ErrorScreen = () => (
  <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center">
    <div className="bg-red-500/10 p-6 rounded-full mb-6">
      <AlertCircle size={48} className="text-red-500" />
    </div>
    <h1 className="text-2xl font-bold text-white mb-2">Invalid Link</h1>
    <p className="text-slate-400 max-w-xs">
      This verification link is broken or the merchant no longer exists.
    </p>
  </div>
);

export default VerifyPage;
