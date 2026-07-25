import fs from 'fs/promises';
import path from 'path';
import { MOCK_SURVEYS } from '@/data/mockSurveys';
import { DEFAULT_QUESTIONS } from '@/data/surveyQuestions';
import { SERVICES_DATA } from '@/data/services';
import { MOCK_SIM_SCHEDULE } from '@/data/mockSchedule';
import { DEFAULT_SITE_CONFIG } from '@/data/siteConfig';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'database.json');

const INITIAL_DATA = {
  surveys: MOCK_SURVEYS,
  questions: DEFAULT_QUESTIONS,
  services: SERVICES_DATA,
  schedules: MOCK_SIM_SCHEDULE,
  config: DEFAULT_SITE_CONFIG
};

async function readDB() {
  try {
    const fileData = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(fileData);
  } catch (err) {
    // If file doesn't exist, create it with INITIAL_DATA
    await writeDB(INITIAL_DATA);
    return INITIAL_DATA;
  }
}

async function writeDB(data) {
  try {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database.json:', err);
    throw err;
  }
}

export const db = {
  // Surveys
  async getSurveys() {
    const data = await readDB();
    return data.surveys || [];
  },

  async addSurvey(surveyData) {
    const data = await readDB();
    const surveys = data.surveys || [];

    // Rate limit: 1 submission per phone number per day
    const todayStr = new Date().toISOString().split('T')[0];
    const hasSubmittedToday = surveys.some(item => {
      const itemDateStr = new Date(item.createdAt).toISOString().split('T')[0];
      return item.noHp?.trim() === surveyData.noHp?.trim() && itemDateStr === todayStr;
    });

    if (hasSubmittedToday) {
      return {
        success: false,
        message: `Nomor HP ${surveyData.noHp} sudah mengirimkan survei pada hari ini. Anda dapat mengisi survei kembali besok.`
      };
    }

    const id = `SRV-${new Date().getFullYear()}-${String(surveys.length + 1).padStart(3, '0')}`;
    const newEntry = {
      id,
      jenisPelayanan: 'Umum',
      ...surveyData,
      createdAt: new Date().toISOString()
    };

    data.surveys = [newEntry, ...surveys];
    await writeDB(data);
    return { success: true, entry: newEntry };
  },

  async deleteSurvey(id) {
    const data = await readDB();
    data.surveys = (data.surveys || []).filter(s => s.id !== id);
    await writeDB(data);
    return true;
  },

  // Questions
  async getQuestions() {
    const data = await readDB();
    return (data.questions || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  async addQuestion(q) {
    const data = await readDB();
    const questions = data.questions || [];
    const newQ = {
      id: q.id || `q${Date.now()}`,
      question: q.question,
      type: q.type || 'radio',
      options: q.options || ["Sangat Baik", "Baik", "Cukup", "Kurang"],
      active: q.active !== undefined ? q.active : true,
      order: q.order || questions.length + 1
    };
    data.questions = [...questions, newQ];
    await writeDB(data);
    return newQ;
  },

  async updateQuestion(id, fields) {
    const data = await readDB();
    data.questions = (data.questions || []).map(q => q.id === id ? { ...q, ...fields } : q);
    await writeDB(data);
    return data.questions.find(q => q.id === id);
  },

  async deleteQuestion(id) {
    const data = await readDB();
    data.questions = (data.questions || []).filter(q => q.id !== id);
    await writeDB(data);
    return true;
  },

  async reorderQuestions(newList) {
    const data = await readDB();
    data.questions = newList.map((q, idx) => ({ ...q, order: idx + 1 }));
    await writeDB(data);
    return data.questions;
  },

  // Services
  async getServices() {
    const data = await readDB();
    return data.services || [];
  },

  async addService(srv) {
    const data = await readDB();
    const newSrv = {
      id: srv.id || `srv-${Date.now()}`,
      status: srv.status || 'Aktif',
      icon: srv.icon || 'FileText',
      requirements: srv.requirements || ["KTP Asli & Fotokopi", "Dokumen pendukung"],
      flow: srv.flow || ["Datang ke loket", "Pemeriksaan berkas", "Penerbitan dokumen"],
      ...srv
    };
    data.services = [...(data.services || []), newSrv];
    await writeDB(data);
    return newSrv;
  },

  async updateService(id, fields) {
    const data = await readDB();
    data.services = (data.services || []).map(s => s.id === id ? { ...s, ...fields } : s);
    await writeDB(data);
    return data.services.find(s => s.id === id);
  },

  async deleteService(id) {
    const data = await readDB();
    data.services = (data.services || []).filter(s => s.id !== id);
    await writeDB(data);
    return true;
  },

  // Schedules
  async getSchedules() {
    const data = await readDB();
    return data.schedules || [];
  },

  async addSchedule(sch) {
    const data = await readDB();
    const newSch = {
      id: sch.id || `sim-${Date.now()}`,
      status: sch.status || 'Mendatang',
      poster: sch.poster || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      ...sch
    };
    data.schedules = [newSch, ...(data.schedules || [])];
    await writeDB(data);
    return newSch;
  },

  async updateSchedule(id, fields) {
    const data = await readDB();
    data.schedules = (data.schedules || []).map(s => s.id === id ? { ...s, ...fields } : s);
    await writeDB(data);
    return data.schedules.find(s => s.id === id);
  },

  async deleteSchedule(id) {
    const data = await readDB();
    data.schedules = (data.schedules || []).filter(s => s.id !== id);
    await writeDB(data);
    return true;
  },

  // Site Config
  async getConfig() {
    const data = await readDB();
    return data.config || DEFAULT_SITE_CONFIG;
  },

  async updateConfig(newConfig) {
    const data = await readDB();
    data.config = { ...data.config, ...newConfig };
    await writeDB(data);
    return data.config;
  }
};
