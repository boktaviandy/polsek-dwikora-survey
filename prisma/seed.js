const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MOCK_SURVEYS = [
  {
    id: "SRV-2026-001",
    nama: "Budi Santoso",
    noHp: "081254321098",
    jenisKelamin: "Laki-laki",
    jenisPelayanan: "SKCK",
    answers: JSON.stringify({ q1: "Sangat Baik", q2: "Sangat Baik", q3: "Baik", q4: "Sangat Baik", q5: "Sangat Baik" }),
    kritiksaran: "Pelayanan SKCK sangat cepat dan petugas ramah sekali. Terima kasih Polsek Dwikora!",
    createdAt: new Date("2026-07-25T08:30:00Z")
  },
  {
    id: "SRV-2026-002",
    nama: "Siti Rahmawati",
    noHp: "085245678901",
    jenisKelamin: "Perempuan",
    jenisPelayanan: "SPKT",
    answers: JSON.stringify({ q1: "Baik", q2: "Baik", q3: "Baik", q4: "Cukup", q5: "Baik" }),
    kritiksaran: "Ruang tunggu SPKT agar ditambah AC supaya lebih sejuk.",
    createdAt: new Date("2026-07-25T09:15:00Z")
  },
  {
    id: "SRV-2026-003",
    nama: "Ahmad Dahlan",
    noHp: "081398765432",
    jenisKelamin: "Laki-laki",
    jenisPelayanan: "Laporan Kehilangan",
    answers: JSON.stringify({ q1: "Sangat Baik", q2: "Sangat Baik", q3: "Sangat Baik", q4: "Baik", q5: "Sangat Baik" }),
    kritiksaran: "Proses surat kehilangan dompet sangat singkat hanya 10 menit. Mantap!",
    createdAt: new Date("2026-07-24T14:20:00Z")
  },
  {
    id: "SRV-2026-004",
    nama: "Dewi Lestari",
    noHp: "089612345678",
    jenisKelamin: "Perempuan",
    jenisPelayanan: "Pengaduan Masyarakat",
    answers: JSON.stringify({ q1: "Baik", q2: "Cukup", q3: "Baik", q4: "Cukup", q5: "Baik" }),
    kritiksaran: "Pengaduan direspon dengan baik, semoga tindak lanjutnya cepat.",
    createdAt: new Date("2026-07-24T11:00:00Z")
  },
  {
    id: "SRV-2026-005",
    nama: "Hendrik Wijaya",
    noHp: "081122334455",
    jenisKelamin: "Laki-laki",
    jenisPelayanan: "SIM",
    answers: JSON.stringify({ q1: "Sangat Baik", q2: "Baik", q3: "Sangat Baik", q4: "Sangat Baik", q5: "Sangat Baik" }),
    kritiksaran: "Jadwal SIM keliling sangat membantu warga Dwikora.",
    createdAt: new Date("2026-07-23T10:45:00Z")
  }
];

const DEFAULT_QUESTIONS = [
  {
    id: "q1",
    question: "Apakah petugas melayani Anda dengan ramah dan sopan?",
    type: "radio",
    options: JSON.stringify(["Sangat Baik", "Baik", "Cukup", "Kurang"]),
    active: true,
    order: 1
  },
  {
    id: "q2",
    question: "Apakah pelayanan diberikan secara cepat dan tepat waktu?",
    type: "radio",
    options: JSON.stringify(["Sangat Baik", "Baik", "Cukup", "Kurang"]),
    active: true,
    order: 2
  },
  {
    id: "q3",
    question: "Apakah persyaratan dan prosedur pelayanan mudah dipahami?",
    type: "radio",
    options: JSON.stringify(["Sangat Baik", "Baik", "Cukup", "Kurang"]),
    active: true,
    order: 3
  },
  {
    id: "q4",
    question: "Apakah sarana dan fasilitas pelayanan di Polsek Dwikora sudah memadai?",
    type: "radio",
    options: JSON.stringify(["Sangat Baik", "Baik", "Cukup", "Kurang"]),
    active: true,
    order: 4
  },
  {
    id: "q5",
    question: "Secara keseluruhan, apakah hasil pelayanan sesuai dengan harapan Anda?",
    type: "radio",
    options: JSON.stringify(["Sangat Baik", "Baik", "Cukup", "Kurang"]),
    active: true,
    order: 5
  }
];

const SERVICES_DATA = [
  {
    id: "skck",
    title: "Surat Keterangan Catatan Kepolisian (SKCK)",
    category: "SKCK",
    description: "Layanan penerbitan surat keterangan resmi dari Polri yang menerangkan ada atau tidak adanya catatan kriminalitas seseorang.",
    operationalHours: "Senin - Jumat: 08.00 - 15.00 WIB | Sabtu: 08.00 - 12.00 WIB",
    fee: "Rp 30.000 (Sesuai PP No. 76 Tahun 2020 tentang PNBP Polri)",
    requirements: JSON.stringify([
      "Fotokopi KTP dengan menunjukkan KTP asli",
      "Fotokopi Kartu Keluarga (KK)",
      "Fotokopi Akte Lahir / Ijazah Terakhir",
      "Pasfoto berwarna ukuran 4x6 latar belakang merah (6 lembar)",
      "Rumus Sidik Jari dari Satreskrim / Polsek",
      "Kartu BPJS Kesehatan Aktif"
    ]),
    flow: JSON.stringify([
      "Mengisi formulir daftar riwayat hidup di loket SKCK",
      "Melakukan pengambilan/perumusan sidik jari (jika belum ada)",
      "Menyerahkan berkas persyaratan lengkap ke petugas",
      "Pembayaran biaya administrasi PNBP sebesar Rp 30.000",
      "Petugas memproses verifikasi data dan cetak SKCK",
      "Pengambilan SKCK yang telah ditandatangani"
    ]),
    icon: "FileText",
    status: "Aktif"
  },
  {
    id: "spkt",
    title: "Sentra Pelayanan Kepolisian Terpadu (SPKT)",
    category: "SPKT",
    description: "Pusat pelayanan utama kepolisian untuk penerimaan laporan tindak pidana, kejadian darurat, serta pengaduan masyarakat selama 24 jam.",
    operationalHours: "24 Jam Non-Stop (Setiap Hari)",
    fee: "GRATIS / Tidak Dipungut Biaya",
    requirements: JSON.stringify([
      "Identitas Diri (KTP / SIM / Passport)",
      "Uraian singkat kronologi kejadian",
      "Bukti pendukung awal (jika ada, seperti foto, dokumen, atau rekaman)",
      "Keterangan saksi-saksi (jika ada)"
    ]),
    flow: JSON.stringify([
      "Mendatangi Ruang SPKT Polsek Dwikora Pontianak",
      "Petugas SPKT melakukan wawancara awal & konseling kejadian",
      "Penulisan Laporan Polisi (LP) atau Surat Tanda Penerimaan Laporan (STPL)",
      "Pemeriksaan awal oleh piket Reskrim/Fungsi terkait",
      "Pelapor menerima salinan STPL / Bukti Laporan"
    ]),
    icon: "ShieldAlert",
    status: "Aktif"
  },
  {
    id: "laporan-kehilangan",
    title: "Surat Keterangan Tanda Lapor Kehilangan (SKTLK)",
    category: "Laporan Kehilangan",
    description: "Pelayanan penerbitan surat keterangan kehilangan barang atau dokumen penting seperti KTP, KK, ATM, Buku Tabungan, ijazah, atau STNK.",
    operationalHours: "24 Jam Non-Stop (Setiap Hari)",
    fee: "GRATIS / Tidak Dipungut Biaya",
    requirements: JSON.stringify([
      "KTP / Kartu Identitas Diri Pelapor",
      "Surat Pengantar / Keterangan pendukung (misal dari Bank untuk ATM/Tabungan)",
      "Fotokopi barang/dokumen yang hilang (jika ada)",
      "Surat Pernyataan Kehilangan bermaterai (untuk dokumen krusial)"
    ]),
    flow: JSON.stringify([
      "Datang ke loket SPKT Polsek Dwikora",
      "Menyampaikan rincian barang/dokumen hilang & estimasi waktu/lokasi",
      "Petugas menginput data ke sistem SKTLK",
      "Penerbitan & penandatanganan Surat Keterangan Kehilangan",
      "Penyerahan dokumen ke pelapor"
    ]),
    icon: "FileSearch",
    status: "Aktif"
  },
  {
    id: "pengaduan-masyarakat",
    title: "Layanan Pengaduan Masyarakat (Dumas)",
    category: "Pengaduan Masyarakat",
    description: "Wadah penampungan aspirasi, keluhan, pengaduan terkait gangguan kamtibmas, potensi konflik sosial, maupun kinerja anggota kepolisian.",
    operationalHours: "24 Jam Non-Stop (Setiap Hari)",
    fee: "GRATIS",
    requirements: JSON.stringify([
      "Identitas Pengadu (KTP / Kontak WA Aktif)",
      "Rincian objek pengaduan / lokasi / pihak terlibat",
      "Bukti pendukung (Foto, Video, atau Dokumen)"
    ]),
    flow: JSON.stringify([
      "Pengisian formulir pengaduan (online via web ini atau tatap muka di SPKT)",
      "Verifikasi berkas oleh Unit Provos/Reskrim",
      "Tindak lanjut wawancara/klarifikasi lapangan",
      "Penyampaian Surat Pemberitahuan Perkembangan Hasil Pengaduan (SP2HP)"
    ]),
    icon: "Megaphone",
    status: "Aktif"
  },
  {
    id: "sim",
    title: "Pelayanan SIM & SIM Keliling",
    category: "SIM",
    description: "Informasi mekanisme perpanjangan dan pembuatan Surat Izin Mengemudi (SIM A, SIM C) di Polsek Dwikora dan Unit SIM Keliling Satpas.",
    operationalHours: "Sesuai Jadwal SIM Keliling / Jam Dinas Satpas",
    fee: "SIM A: Rp 80.000 | SIM C: Rp 75.000 (Perpanjangan resmi PNBP)",
    requirements: JSON.stringify([
      "SIM Lama yang masih berlaku (belum kadaluarsa)",
      "Fotokopi KTP (3 lembar)",
      "Surat Keterangan Sehat dari Dokter Polri/Ditunjuk",
      "Hasil Tes Psikologi SIM"
    ]),
    flow: JSON.stringify([
      "Registrasi & pendaftaran di mobil/loket SIM Keliling",
      "Pemeriksaan kesehatan fisik & tes psikologi di lokasi",
      "Verifikasi data & identifikasi (foto, sidik jari, ttd elektronik)",
      "Pembayaran PNBP di loket pembayaran",
      "Pencetakan SIM Baru"
    ]),
    icon: "CreditCard",
    status: "Aktif"
  },
  {
    id: "sidik-jari",
    title: "Perumusan & Pengambilan Sidik Jari",
    category: "Sidik Jari",
    description: "Layanan pengambilan data biometrik 10 jari tangan untuk keperluan penerbitan kartu rumus sidik jari (kelengkapan SKCK / Identifikasi).",
    operationalHours: "Senin - Jumat: 08.00 - 14.30 WIB",
    fee: "GRATIS",
    requirements: JSON.stringify([
      "Fotokopi KTP",
      "Pasfoto 4x6 latar belakang merah (2 lembar, tampak telinga)",
      "Formulir data biometrik"
    ]),
    flow: JSON.stringify([
      "Mengambil formulir di ruang Inafis / Satreskrim",
      "Perekaman 10 sidik jari menggunakan tinta khusus",
      "Perumusan pola rumus sidik jari oleh petugas",
      "Penyerahan Kartu Rumus Sidik Jari"
    ]),
    icon: "Fingerprint",
    status: "Aktif"
  },
  {
    id: "perizinan",
    title: "Surat Izin Keramaian & Kegiatan Masyarakat",
    category: "Perizinan",
    description: "Penerbitan surat rekomendasi atau izin penyelenggaraan kegiatan umum, pertunjukan musik, pesta, atau kumpul massa.",
    operationalHours: "Senin - Jumat: 08.00 - 15.00 WIB (Pengajuan H-7 Kegiatan)",
    fee: "GRATIS",
    requirements: JSON.stringify([
      "Surat Permohonan dari Panitia / Penanggung Jawab",
      "Proposal Kegiatan & Susunan Acara",
      "Surat Pengantar dari Kelurahan & Kecamatan setempat",
      "Fotokopi KTP Ketua Panitia",
      "Denah lokasi kegiatan & persetujuan warga sekitar"
    ]),
    flow: JSON.stringify([
      "Menyerahkan berkas permohonan ke Unit Intelkam Polsek",
      "Analisis kerawanan & koordinasi keamanan lokasi",
      "Penerbitan Surat Rekomendasi / Surat Izin Keramaian"
    ]),
    icon: "FileCheck",
    status: "Aktif"
  }
];

const MOCK_SIM_SCHEDULE = [
  {
    id: "sim-1",
    tanggal: "2026-07-28",
    hari: "Selasa",
    lokasi: "Ayani Mega Mall (Halaman Parkir Barat)",
    jam: "08:00 - 12:00 WIB",
    keterangan: "Melayani Perpanjangan SIM A & SIM C",
    poster: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    status: "Mendatang"
  },
  {
    id: "sim-2",
    tanggal: "2026-07-29",
    hari: "Rabu",
    lokasi: "Transmart Pontianak (Area Lobi Utama)",
    jam: "08:00 - 12:00 WIB",
    keterangan: "Melayani Perpanjangan SIM A & SIM C",
    poster: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
    status: "Mendatang"
  },
  {
    id: "sim-3",
    tanggal: "2026-07-30",
    hari: "Kamis",
    lokasi: "Pasar Flamboyan Pontianak",
    jam: "08:30 - 11:30 WIB",
    keterangan: "Persiapkan E-KTP & SIM Lama yang masih berlaku",
    poster: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=800&q=80",
    status: "Mendatang"
  },
  {
    id: "sim-4",
    tanggal: "2026-07-25",
    hari: "Sabtu",
    lokasi: "Taman Akcaya Pontianak",
    jam: "08:00 - 12:00 WIB",
    keterangan: "Khusus Perpanjangan SIM A dan C",
    poster: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    status: "Selesai"
  }
];

const DEFAULT_SITE_CONFIG = {
  siteName: "Survei Pelayanan Masyarakat",
  subTitle: "Kepolisian Sektor (Polsek) Dwikora - Polresta Pontianak",
  policeName: "Polsek Dwikora Pontianak",
  kapolsekName: "AKP Bambang Hendarto, S.H., M.H.",
  kapolsekTitle: "Kapolsek Dwikora Pontianak",
  kapolsekPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  kapolsekMessage: "Selamat datang di Portal Survei Kepuasan Masyarakat Polsek Dwikora Pontianak. Transparansi dan kepuasan masyarakat adalah komitmen utama kami. Melalui survei ini, kami invites peran aktif seluruh warga untuk memberikan masukan, kritik, dan penilaian yang objektif guna mewujudkan pelayanan kepolisian yang Presisi (Prediktif, Responsibilitas, Transparansi Berkeadilan), modern, serta humanis.",
  heroBannerImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80",
  polsekPhoto: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Logo_Polda_Kalbar.png/360px-Logo_Polda_Kalbar.png",
  logoFooterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Logo_Polda_Kalbar.png/360px-Logo_Polda_Kalbar.png",
  faviconUrl: "/favicon.ico",
  address: "Jl. Pak Kasih No. 1, Kel. St. Barito, Kec. Pontianak Kota, Kota Pontianak, Kalimantan Barat 78111",
  phone: "(0561) 734991",
  whatsapp: "0812-5555-9110",
  email: "polsek.dwikora@polrestapontianak.go.id",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8173456789!2d109.333333!3d-0.033333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDIn00LjMCIgMTA5wrAyMCcwMC4wIkU!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid",
  socials: {
    facebook: "https://facebook.com/polsekdwikora",
    instagram: "https://instagram.com/polsekdwikora_ptk",
    twitter: "https://twitter.com/polsekdwikora",
    youtube: "https://youtube.com/@polsekdwikora"
  },
  seo: {
    metaTitle: "Survey Pelayanan Masyarakat - Polsek Dwikora Pontianak",
    metaDescription: "Portal Resmi Survei Kepuasan Masyarakat (SKM) Polsek Dwikora Pontianak. Sampaikan penilaian dan masukan Anda untuk peningkatan mutu pelayanan kepolisian."
  }
};

async function main() {
  console.log("Seeding database...");

  // Seed Questions
  for (const q of DEFAULT_QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q,
      create: q
    });
  }

  // Seed Surveys
  for (const s of MOCK_SURVEYS) {
    await prisma.survey.upsert({
      where: { id: s.id },
      update: s,
      create: s
    });
  }

  // Seed Services
  for (const srv of SERVICES_DATA) {
    await prisma.service.upsert({
      where: { id: srv.id },
      update: srv,
      create: srv
    });
  }

  // Seed Schedules
  for (const sch of MOCK_SIM_SCHEDULE) {
    await prisma.sIMSchedule.upsert({
      where: { id: sch.id },
      update: sch,
      create: sch
    });
  }

  // Seed SiteConfig
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: { data: JSON.stringify(DEFAULT_SITE_CONFIG) },
    create: { id: 1, data: JSON.stringify(DEFAULT_SITE_CONFIG) }
  });

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
