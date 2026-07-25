export const DEFAULT_QUESTIONS = [
  {
    id: "q1",
    question: "Apakah petugas melayani Anda dengan ramah dan sopan?",
    type: "radio",
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    active: true,
    order: 1
  },
  {
    id: "q2",
    question: "Apakah pelayanan diberikan secara cepat dan tepat waktu?",
    type: "radio",
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    active: true,
    order: 2
  },
  {
    id: "q3",
    question: "Apakah persyaratan dan prosedur pelayanan mudah dipahami?",
    type: "radio",
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    active: true,
    order: 3
  },
  {
    id: "q4",
    question: "Apakah sarana dan fasilitas pelayanan di Polsek Dwikora sudah memadai?",
    type: "radio",
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    active: true,
    order: 4
  },
  {
    id: "q5",
    question: "Secara keseluruhan, apakah hasil pelayanan sesuai dengan harapan Anda?",
    type: "radio",
    options: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
    active: true,
    order: 5
  }
];

export const SERVICE_TYPES = [
  "SKCK",
  "SPKT",
  "Laporan Kehilangan",
  "Pengaduan Masyarakat",
  "SIM",
  "Sidik Jari",
  "Perizinan",
  "Lainnya"
];
