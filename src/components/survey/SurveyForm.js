'use client';

import React, { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { 
  User, 
  Smile, 
  FileText, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  RefreshCw,
  Star 
} from 'lucide-react';

export default function SurveyForm() {
  const { questions, addSurvey, checkHasSubmittedToday } = useSurvey();

  const [formData, setFormData] = useState({
    nama: '',
    noHp: '',
    jenisKelamin: '',
    answers: {},
    kritiksaran: ''
  });

  const [errors, setErrors] = useState({});
  const [rateLimitError, setRateLimitError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation before submit
  const validateForm = () => {
    const errs = {};
    setRateLimitError('');

    // Validasi Nama
    if (!formData.nama.trim()) {
      errs.nama = 'Nama lengkap wajib diisi';
    }

    // Validasi Nomor HP
    const cleanHp = formData.noHp.replace(/\D/g, '');
    if (!formData.noHp.trim()) {
      errs.noHp = 'Nomor HP wajib diisi';
    } else if (cleanHp.length < 10 || cleanHp.length > 15) {
      errs.noHp = 'Nomor HP harus berupa 10–15 digit angka (misal: 081234567890)';
    }

    // Validasi Jenis Kelamin
    if (!formData.jenisKelamin) {
      errs.jenisKelamin = 'Pilih jenis kelamin Anda';
    }

    // Validasi Pertanyaan Survei
    const activeQuestions = questions.filter(q => q.active);
    activeQuestions.forEach(q => {
      if (!formData.answers[q.id]) {
        errs[q.id] = 'Pertanyaan ini wajib dijawab';
      }
    });

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // Check rate limit duplication
      const hasSubmitted = checkHasSubmittedToday(formData.noHp);
      if (hasSubmitted) {
        setRateLimitError(`Nomor HP (${formData.noHp}) sudah digunakan untuk mengirim survei pada hari ini. Ketentuan sistem membatasi 1 survei per nomor HP per hari.`);
        return false;
      }
      return true;
    }

    // Scroll to first error
    const firstErrKey = Object.keys(errs)[0];
    if (firstErrKey) {
      const el = document.getElementById(`field-${firstErrKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const result = addSurvey(formData);
      setIsSubmitting(false);

      if (result.success) {
        setSubmittedData(result.entry);
      } else {
        setRateLimitError(result.message);
      }
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      nama: '',
      noHp: '',
      jenisKelamin: '',
      answers: {},
      kritiksaran: ''
    });
    setErrors({});
    setRateLimitError('');
    setSubmittedData(null);
  };

  // Thank You / Success View
  if (submittedData) {
    return (
      <div className="max-w-2xl mx-auto bg-polri-card/90 border-2 border-polri-gold rounded-3xl p-8 sm:p-10 text-center shadow-2xl space-y-6 animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-polri-gold via-yellow-400 to-polri-blue" />
        
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 flex items-center justify-center shadow-glow">
          <ShieldCheck className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-polri-gold/20 text-polri-gold text-xs font-bold uppercase tracking-wider">
            Survei Berhasil Terkirim
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Terima Kasih Atas Partisipasi Anda!</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Data survei Anda telah tersimpan dengan aman ke dalam sistem database Polsek Dwikora Pontianak.
          </p>
        </div>

        {/* Survey Reference Box */}
        <div className="p-4 rounded-2xl bg-polri-dark/80 border border-slate-700 text-left space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-700/80 pb-2">
            <span className="text-slate-400">ID Registrasi Survei</span>
            <span className="font-mono font-bold text-polri-gold">{submittedData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nama Responden</span>
            <span className="font-semibold text-white">{submittedData.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nomor HP</span>
            <span className="font-semibold text-white">{submittedData.noHp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Jenis Kelamin</span>
            <span className="font-semibold text-white">{submittedData.jenisKelamin}</span>
          </div>
          <div className="flex justify-between pt-1 text-[11px] text-slate-500">
            <span>Waktu Pengisian</span>
            <span>{new Date(submittedData.createdAt).toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-sm shadow-glow-gold flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Isi Survei Lainnya</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="form-survey-section" className="max-w-3xl mx-auto bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
      
      {/* Header Form */}
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Formulir Survei Kepuasan Masyarakat</h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          Isi data diri Anda dan jawab pertanyaan survei di bawah ini secara langsung.
        </p>
      </div>

      {/* Rate limit error box */}
      {rateLimitError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs sm:text-sm flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-bold mb-0.5">Pembatasan Pengisian Survei:</strong>
            {rateLimitError}
          </div>
        </div>
      )}

      {/* Single Continuous Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* ================= SECTION 1: DATA RESPONDEN ================= */}
        <div className="space-y-6">
          <div className="border-b border-slate-700/80 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-polri-gold flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>1. Data Responden</span>
            </h3>
            <span className="text-xs text-rose-400 font-semibold">* Wajib diisi</span>
          </div>

          {/* Field 1: Nama Lengkap */}
          <div id="field-nama" className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Nama Lengkap <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap Anda sesuai KTP..."
              value={formData.nama}
              onChange={(e) => {
                setFormData({ ...formData, nama: e.target.value });
                if (errors.nama) setErrors({ ...errors, nama: null });
              }}
              className={`w-full px-4 py-3.5 rounded-xl bg-polri-dark border text-white text-sm placeholder-slate-500 focus:outline-none transition-all ${
                errors.nama ? 'border-rose-500 focus:ring-2 focus:ring-rose-500' : 'border-slate-700 focus:border-polri-gold focus:ring-1 focus:ring-polri-gold'
              }`}
            />
            {errors.nama && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.nama}</p>}
          </div>

          {/* Field 2: Nomor HP */}
          <div id="field-noHp" className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Nomor HP / WhatsApp <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="Contoh: 081234567890 (10–15 digit)"
              value={formData.noHp}
              onChange={(e) => {
                setFormData({ ...formData, noHp: e.target.value });
                if (errors.noHp) setErrors({ ...errors, noHp: null });
              }}
              className={`w-full px-4 py-3.5 rounded-xl bg-polri-dark border text-white text-sm placeholder-slate-500 focus:outline-none transition-all ${
                errors.noHp ? 'border-rose-500 focus:ring-2 focus:ring-rose-500' : 'border-slate-700 focus:border-polri-gold focus:ring-1 focus:ring-polri-gold'
              }`}
            />
            {errors.noHp ? (
              <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.noHp}</p>
            ) : (
              <p className="text-[11px] text-slate-400">Nomor HP digunakan untuk memvalidasi 1 survei per hari.</p>
            )}
          </div>

          {/* Field 3: Jenis Kelamin */}
          <div id="field-jenisKelamin" className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Jenis Kelamin <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {['Laki-laki', 'Perempuan'].map((gender) => {
                const isSelected = formData.jenisKelamin === gender;
                return (
                  <button
                    type="button"
                    key={gender}
                    onClick={() => {
                      setFormData({ ...formData, jenisKelamin: gender });
                      if (errors.jenisKelamin) setErrors({ ...errors, jenisKelamin: null });
                    }}
                    className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-polri-gold text-polri-dark border-polri-gold shadow-glow-gold'
                        : 'bg-polri-dark text-slate-300 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-polri-dark bg-polri-dark' : 'border-slate-500'}`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-polri-gold" />}
                    </span>
                    <span>{gender}</span>
                  </button>
                );
              })}
            </div>
            {errors.jenisKelamin && <p className="text-xs text-rose-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.jenisKelamin}</p>}
          </div>

        </div>

        {/* ================= SECTION 2: PERTANYAAN SURVEI ================= */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="border-b border-slate-700/80 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-polri-gold flex items-center gap-2">
              <Smile className="w-5 h-5" />
              <span>2. Pertanyaan Survei Kepuasan</span>
            </h3>
            <span className="text-xs text-rose-400 font-semibold">* Wajib dijawab</span>
          </div>

          <div className="space-y-6">
            {questions.filter(q => q.active).map((q, idx) => {
              const selectedAns = formData.answers[q.id];
              const hasErr = errors[q.id];

              return (
                <div 
                  key={q.id}
                  id={`field-${q.id}`} 
                  className={`p-5 rounded-2xl bg-polri-dark/90 border transition-all ${
                    hasErr ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700/80 hover:border-polri-gold/40'
                  }`}
                >
                  <p className="text-sm font-semibold text-white mb-4 leading-relaxed">
                    <span className="inline-block w-6 h-6 rounded-full bg-polri-gold/20 text-polri-gold text-xs font-bold text-center leading-6 mr-2">
                      {idx + 1}
                    </span>
                    {q.question} <span className="text-rose-400">*</span>
                  </p>

                  {/* Dynamic Render Based on q.type */}
                  {q.type === 'rating' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 sm:gap-4 p-4 rounded-2xl bg-polri-card/80 border border-slate-700/80">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const ratingMap = {
                            5: "Sangat Baik",
                            4: "Baik",
                            3: "Baik",
                            2: "Cukup",
                            1: "Kurang"
                          };
                          const mappedOption = ratingMap[starValue];

                          const currentScore = selectedAns === "Sangat Baik" ? 5 : selectedAns === "Baik" ? 4 : selectedAns === "Cukup" ? 2 : selectedAns === "Kurang" ? 1 : 0;
                          const isFilled = starValue <= currentScore;

                          return (
                            <button
                              type="button"
                              key={starValue}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  answers: { ...formData.answers, [q.id]: mappedOption }
                                });
                                if (errors[q.id]) {
                                  const newErrs = { ...errors };
                                  delete newErrs[q.id];
                                  setErrors(newErrs);
                                }
                              }}
                              className="group flex flex-col items-center gap-1.5 p-2 transition-transform hover:scale-110 focus:outline-none"
                            >
                              <Star
                                className={`w-8 h-8 sm:w-10 sm:h-10 transition-all ${
                                  isFilled
                                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-110'
                                    : 'text-slate-600 hover:text-amber-300'
                                }`}
                              />
                              <span className={`text-[10px] font-bold ${isFilled ? 'text-amber-300' : 'text-slate-500'}`}>
                                {starValue} Bintang
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {selectedAns && (
                        <p className="text-center text-xs font-bold text-polri-gold bg-polri-gold/10 py-1.5 px-3 rounded-full border border-polri-gold/30 max-w-xs mx-auto animate-fade-in">
                          Penilaian Anda: <strong>{selectedAns}</strong>
                        </p>
                      )}
                    </div>
                  ) : q.type === 'scale' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-2 sm:gap-3">
                        {[1, 2, 3, 4, 5].map((scaleVal) => {
                          const scaleMap = {
                            5: "Sangat Baik",
                            4: "Baik",
                            3: "Baik",
                            2: "Cukup",
                            1: "Kurang"
                          };
                          const mappedOption = scaleMap[scaleVal];
                          const currentScore = selectedAns === "Sangat Baik" ? 5 : selectedAns === "Baik" ? 4 : selectedAns === "Cukup" ? 2 : selectedAns === "Kurang" ? 1 : 0;
                          const isSelected = currentScore === scaleVal;

                          return (
                            <button
                              type="button"
                              key={scaleVal}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  answers: { ...formData.answers, [q.id]: mappedOption }
                                });
                                if (errors[q.id]) {
                                  const newErrs = { ...errors };
                                  delete newErrs[q.id];
                                  setErrors(newErrs);
                                }
                              }}
                              className={`p-3 sm:p-4 rounded-xl border text-sm font-extrabold flex flex-col items-center justify-center gap-1 transition-all ${
                                isSelected
                                  ? 'bg-polri-gold text-polri-dark border-polri-gold shadow-glow-gold scale-105'
                                  : 'bg-polri-card text-slate-300 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              <span className="text-base sm:text-lg">{scaleVal}</span>
                              <span className="text-[10px] font-medium opacity-80">
                                {scaleVal === 5 ? 'Sangat Baik' : scaleVal === 4 ? 'Baik' : scaleVal === 3 ? 'Cukup' : scaleVal === 2 ? 'Kurang' : 'Sangat Kurang'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(q.options || ["Sangat Baik", "Baik", "Cukup", "Kurang"]).map((opt) => {
                        const isOptSelected = selectedAns === opt;

                        let activeStyle = 'bg-polri-gold text-polri-dark border-polri-gold shadow-glow-gold';
                        if (opt === 'Sangat Baik') activeStyle = 'bg-emerald-500 text-white border-emerald-400 shadow-glow';
                        if (opt === 'Baik') activeStyle = 'bg-blue-600 text-white border-blue-400 shadow-glow';
                        if (opt === 'Cukup') activeStyle = 'bg-amber-500 text-polri-dark border-amber-400';
                        if (opt === 'Kurang') activeStyle = 'bg-rose-600 text-white border-rose-400';

                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                answers: { ...formData.answers, [q.id]: opt }
                              });
                              if (errors[q.id]) {
                                const newErrs = { ...errors };
                                delete newErrs[q.id];
                                setErrors(newErrs);
                              }
                            }}
                            className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                              isOptSelected
                                ? `${activeStyle} scale-105`
                                : 'bg-polri-card text-slate-300 border-slate-700 hover:border-slate-500'
                            }`}
                          >
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {hasErr && <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{hasErr}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION 3: KRITIK & SARAN ================= */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="border-b border-slate-700/80 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-polri-gold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>3. Kritik & Saran (Opsional)</span>
            </h3>
            <span className="text-xs text-slate-400">Opsional</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Sampaikan kritik, saran, atau masukan Anda untuk Polsek Dwikora Pontianak:
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan masukan atau saran Anda di sini (misalnya mengenai fasilitas, kenyamanan, atau respon pelayanan)..."
              value={formData.kritiksaran}
              onChange={(e) => setFormData({ ...formData, kritiksaran: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-polri-gold focus:ring-1 focus:ring-polri-gold transition-all"
            />
          </div>
        </div>

        {/* Single Submit Button */}
        <div className="pt-6 border-t border-slate-800 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-polri-gold to-yellow-400 hover:from-amber-400 hover:to-polri-gold text-polri-dark font-extrabold text-base shadow-glow-gold flex items-center justify-center gap-3 transition-transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Mengirim Survei...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Kirim Survey</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
