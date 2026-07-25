'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_SURVEYS } from '@/data/mockSurveys';
import { DEFAULT_QUESTIONS } from '@/data/surveyQuestions';

const SurveyContext = createContext();

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = async () => {
    try {
      const [resSurveys, resQuestions] = await Promise.all([
        fetch('/api/surveys', { cache: 'no-store' }),
        fetch('/api/questions', { cache: 'no-store' })
      ]);

      if (resSurveys.ok) {
        const surveysData = await resSurveys.json();
        setSurveys(surveysData);
      } else {
        const savedSurveys = localStorage.getItem('polsek_dwikora_surveys');
        setSurveys(savedSurveys ? JSON.parse(savedSurveys) : MOCK_SURVEYS);
      }

      if (resQuestions.ok) {
        const questionsData = await resQuestions.json();
        setQuestions(questionsData);
      } else {
        const savedQuestions = localStorage.getItem('polsek_dwikora_questions');
        setQuestions(savedQuestions ? JSON.parse(savedQuestions) : DEFAULT_QUESTIONS);
      }
    } catch (err) {
      console.warn('Falling back to local storage for SurveyContext:', err);
      const savedSurveys = localStorage.getItem('polsek_dwikora_surveys');
      const savedQuestions = localStorage.getItem('polsek_dwikora_questions');
      setSurveys(savedSurveys ? JSON.parse(savedSurveys) : MOCK_SURVEYS);
      setQuestions(savedQuestions ? JSON.parse(savedQuestions) : DEFAULT_QUESTIONS);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Check rate limit: 1 survey per phone number per calendar day
  const checkHasSubmittedToday = (noHp) => {
    if (!noHp) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return surveys.some((item) => {
      const itemDateStr = new Date(item.createdAt).toISOString().split('T')[0];
      const matchHp = item.noHp?.trim() === noHp?.trim();
      return matchHp && itemDateStr === todayStr;
    });
  };

  const addSurvey = async (newSurveyData) => {
    if (checkHasSubmittedToday(newSurveyData.noHp)) {
      return {
        success: false,
        message: `Nomor HP ${newSurveyData.noHp} sudah mengirimkan survei pada hari ini. Anda dapat mengisi survei kembali besok.`
      };
    }

    try {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSurveyData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSurveys(prev => [data.entry, ...prev]);
        return { success: true, entry: data.entry };
      } else {
        return { success: false, message: data.message || 'Gagal menyimpan survei' };
      }
    } catch (err) {
      console.error('API Error addSurvey, fallback to local state:', err);
      const newEntry = {
        id: `SRV-${new Date().getFullYear()}-${String(surveys.length + 1).padStart(3, '0')}`,
        jenisPelayanan: 'Umum',
        ...newSurveyData,
        createdAt: new Date().toISOString()
      };
      const updated = [newEntry, ...surveys];
      setSurveys(updated);
      localStorage.setItem('polsek_dwikora_surveys', JSON.stringify(updated));
      return { success: true, entry: newEntry };
    }
  };

  const deleteSurvey = async (id) => {
    try {
      await fetch(`/api/surveys/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('API Error deleteSurvey:', err);
    }
    const updated = surveys.filter(s => s.id !== id);
    setSurveys(updated);
    localStorage.setItem('polsek_dwikora_surveys', JSON.stringify(updated));
  };

  const addQuestion = async (q) => {
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(q)
      });
      if (res.ok) {
        const newQ = await res.json();
        setQuestions(prev => [...prev, newQ]);
        return;
      }
    } catch (err) {
      console.error('API Error addQuestion:', err);
    }
    const newQ = {
      id: `q${Date.now()}`,
      order: questions.length + 1,
      active: true,
      options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
      ...q
    };
    const updated = [...questions, newQ];
    setQuestions(updated);
    localStorage.setItem('polsek_dwikora_questions', JSON.stringify(updated));
  };

  const updateQuestion = async (id, updatedFields) => {
    try {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updatedQ = await res.json();
        setQuestions(prev => prev.map(q => q.id === id ? updatedQ : q));
        return;
      }
    } catch (err) {
      console.error('API Error updateQuestion:', err);
    }
    const updated = questions.map(q => q.id === id ? { ...q, ...updatedFields } : q);
    setQuestions(updated);
    localStorage.setItem('polsek_dwikora_questions', JSON.stringify(updated));
  };

  const deleteQuestion = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('API Error deleteQuestion:', err);
    }
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    localStorage.setItem('polsek_dwikora_questions', JSON.stringify(updated));
  };

  const reorderQuestions = async (newQuestionsList) => {
    const updatedWithOrder = newQuestionsList.map((q, idx) => ({ ...q, order: idx + 1 }));
    setQuestions(updatedWithOrder);
    try {
      await fetch('/api/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWithOrder)
      });
    } catch (err) {
      console.error('API Error reorderQuestions:', err);
      localStorage.setItem('polsek_dwikora_questions', JSON.stringify(updatedWithOrder));
    }
  };

  const calculateStats = () => {
    if (!surveys.length) {
      return {
        totalSurveys: 0,
        todaySurveys: 0,
        ikmScore: 0,
        satisfactionRate: 0,
        distribution: { "Sangat Baik": 0, "Baik": 0, "Cukup": 0, "Kurang": 0 }
      };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const todaySurveys = surveys.filter(s => new Date(s.createdAt).toISOString().split('T')[0] === todayStr).length;

    let totalScorePoints = 0;
    let totalAnswersCount = 0;
    const distribution = { "Sangat Baik": 0, "Baik": 0, "Cukup": 0, "Kurang": 0 };

    surveys.forEach(s => {
      if (s.answers) {
        Object.values(s.answers).forEach(val => {
          if (distribution[val] !== undefined) {
            distribution[val]++;
          }
          if (val === "Sangat Baik") totalScorePoints += 4;
          else if (val === "Baik") totalScorePoints += 3;
          else if (val === "Cukup") totalScorePoints += 2;
          else if (val === "Kurang") totalScorePoints += 1;
          totalAnswersCount++;
        });
      }
    });

    const avgScore = totalAnswersCount > 0 ? (totalScorePoints / totalAnswersCount) : 0;
    const ikmIndex = (avgScore / 4) * 100;
    const satisfactionRate = (distribution["Sangat Baik"] + distribution["Baik"]) / (totalAnswersCount || 1) * 100;

    return {
      totalSurveys: surveys.length,
      todaySurveys,
      avgScore: avgScore.toFixed(2),
      ikmScore: ikmIndex.toFixed(1),
      satisfactionRate: satisfactionRate.toFixed(1),
      distribution
    };
  };

  return (
    <SurveyContext.Provider value={{
      surveys,
      questions,
      isLoaded,
      addSurvey,
      deleteSurvey,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      reorderQuestions,
      checkHasSubmittedToday,
      calculateStats
    }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  return useContext(SurveyContext);
}
