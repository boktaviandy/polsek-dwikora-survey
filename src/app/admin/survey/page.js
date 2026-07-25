'use client';

import React, { useState } from 'react';
import { useSurvey } from '@/context/SurveyContext';
import { HelpCircle, Plus, Trash2, Edit3, Check, X, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

export default function KelolaSurveyPage() {
  const { questions, addQuestion, updateQuestion, deleteQuestion, reorderQuestions } = useSurvey();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [answerType, setAnswerType] = useState('radio');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setQuestionText('');
    setAnswerType('radio');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingItem(q);
    setQuestionText(q.question);
    setAnswerType(q.type || 'radio');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    if (editingItem) {
      updateQuestion(editingItem.id, {
        question: questionText,
        type: answerType
      });
    } else {
      addQuestion({
        question: questionText,
        type: answerType
      });
    }

    setIsModalOpen(false);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const list = [...questions];
    const temp = list[index];
    list[index] = list[index - 1];
    list[index - 1] = temp;
    reorderQuestions(list);
  };

  const handleMoveDown = (index) => {
    if (index === questions.length - 1) return;
    const list = [...questions];
    const temp = list[index];
    list[index] = list[index + 1];
    list[index + 1] = temp;
    reorderQuestions(list);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-polri-card/90 border border-polri-gold/30 rounded-3xl p-6 shadow-xl">
        <div>
          <span className="text-xs font-bold text-polri-gold uppercase tracking-wider">Manajemen Instrumen</span>
          <h1 className="text-2xl font-extrabold text-white">Kelola Pertanyaan Survei</h1>
          <p className="text-xs text-slate-400 mt-0.5">Tambah, ubah urutan, atau aktifkan/nonaktifkan indikator kepuasan.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark font-bold text-xs shadow-glow-gold flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Tambah Pertanyaan Baru</span>
        </button>
      </div>

      {/* Questions List Table */}
      <div className="bg-polri-card/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-polri-dark text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3 w-16 text-center">Urutan</th>
                <th className="px-4 py-3">Teks Pertanyaan</th>
                <th className="px-4 py-3">Jenis Jawaban</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center w-36">Aksi & Reorder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {questions.map((q, idx) => (
                <tr key={q.id} className="hover:bg-polri-dark/50 transition-colors">
                  <td className="px-4 py-3 text-center font-bold text-polri-gold">#{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-white max-w-md">{q.question}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[11px]">
                      {q.type || 'radio (4 Opsi)'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => updateQuestion(q.id, { active: !q.active })}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                        q.active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {q.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{q.active ? 'Aktif' : 'Nonaktif'}</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        title="Naikkan"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === questions.length - 1}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                        title="Turunkan"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(q)}
                        className="p-1.5 rounded-lg bg-amber-500/20 text-polri-gold hover:bg-polri-gold hover:text-polri-dark transition-colors"
                        title="Edit Pertanyaan"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Hapus pertanyaan ini?')) deleteQuestion(q.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-polri-card border border-polri-gold rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl animate-fade-in relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white">
              {editingItem ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Teks Pertanyaan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan kalimat pertanyaan survei..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Jenis Jawaban</label>
                <select
                  value={answerType}
                  onChange={(e) => setAnswerType(e.target.value)}
                  className="w-full p-3 rounded-xl bg-polri-dark border border-slate-700 text-white text-xs focus:outline-none focus:border-polri-gold"
                >
                  <option value="radio">Radio Button (Sangat Baik / Baik / Cukup / Kurang)</option>
                  <option value="rating">Rating Bintang (1 - 5 Bintang)</option>
                  <option value="scale">Skala Angka (1 - 5)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-polri-gold hover:bg-polri-goldHover text-polri-dark text-xs font-bold shadow-glow-gold"
                >
                  Simpan Pertanyaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
