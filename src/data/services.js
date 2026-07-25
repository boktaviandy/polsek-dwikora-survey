export const SERVICES_DATA = [
  {
    id: "skck",
    title: "Surat Keterangan Catatan Kepolisian (SKCK)",
    category: "SKCK",
    description: "Layanan penerbitan surat keterangan resmi dari Polri yang menerangkan ada atau tidak adanya catatan kriminalitas seseorang.",
    operationalHours: "Senin - Jumat: 08.00 - 15.00 WIB | Sabtu: 08.00 - 12.00 WIB",
    fee: "Rp 30.000 (Sesuai PP No. 76 Tahun 2020 tentang PNBP Polri)",
    requirements: [
      "Fotokopi KTP dengan menunjukkan KTP asli",
      "Fotokopi Kartu Keluarga (KK)",
      "Fotokopi Akte Lahir / Ijazah Terakhir",
      "Pasfoto berwarna ukuran 4x6 latar belakang merah (6 lembar)",
      "Rumus Sidik Jari dari Satreskrim / Polsek",
      "Kartu BPJS Kesehatan Aktif"
    ],
    flow: [
      "Mengisi formulir daftar riwayat hidup di loket SKCK",
      "Melakukan pengambilan/perumusan sidik jari (jika belum ada)",
      "Menyerahkan berkas persyaratan lengkap ke petugas",
      "Pembayaran biaya administrasi PNBP sebesar Rp 30.000",
      "Petugas memproses verifikasi data dan cetak SKCK",
      "Pengambilan SKCK yang telah ditandatangani"
    ],
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
    requirements: [
      "Identitas Diri (KTP / SIM / Passport)",
      "Uraian singkat kronologi kejadian",
      "Bukti pendukung awal (jika ada, seperti foto, dokumen, atau rekaman)",
      "Keterangan saksi-saksi (jika ada)"
    ],
    flow: [
      "Mendatangi Ruang SPKT Polsek Dwikora Pontianak",
      "Petugas SPKT melakukan wawancara awal & konseling kejadian",
      "Penulisan Laporan Polisi (LP) atau Surat Tanda Penerimaan Laporan (STPL)",
      "Pemeriksaan awal oleh piket Reskrim/Fungsi terkait",
      "Pelapor menerima salinan STPL / Bukti Laporan"
    ],
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
    requirements: [
      "KTP / Kartu Identitas Diri Pelapor",
      "Surat Pengantar / Keterangan pendukung (misal dari Bank untuk ATM/Tabungan)",
      "Fotokopi barang/dokumen yang hilang (jika ada)",
      "Surat Pernyataan Kehilangan bermaterai (untuk dokumen krusial)"
    ],
    flow: [
      "Datang ke loket SPKT Polsek Dwikora",
      "Menyampaikan rincian barang/dokumen hilang & estimasi waktu/lokasi",
      "Petugas menginput data ke sistem SKTLK",
      "Penerbitan & penandatanganan Surat Keterangan Kehilangan",
      "Penyerahan dokumen ke pelapor"
    ],
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
    requirements: [
      "Identitas Pengadu (KTP / Kontak WA Aktif)",
      "Rincian objek pengaduan / lokasi / pihak terlibat",
      "Bukti pendukung (Foto, Video, atau Dokumen)"
    ],
    flow: [
      "Pengisian formulir pengaduan (online via web ini atau tatap muka di SPKT)",
      "Verifikasi berkas oleh Unit Provos/Reskrim",
      "Tindak lanjut wawancara/klarifikasi lapangan",
      "Penyampaian Surat Pemberitahuan Perkembangan Hasil Pengaduan (SP2HP)"
    ],
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
    requirements: [
      "SIM Lama yang masih berlaku (belum kadaluarsa)",
      "Fotokopi KTP (3 lembar)",
      "Surat Keterangan Sehat dari Dokter Polri/Ditunjuk",
      "Hasil Tes Psikologi SIM"
    ],
    flow: [
      "Registrasi & pendaftaran di mobil/loket SIM Keliling",
      "Pemeriksaan kesehatan fisik & tes psikologi di lokasi",
      "Verifikasi data & identifikasi (foto, sidik jari, ttd elektronik)",
      "Pembayaran PNBP di loket pembayaran",
      "Pencetakan SIM Baru"
    ],
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
    requirements: [
      "Fotokopi KTP",
      "Pasfoto 4x6 latar belakang merah (2 lembar, tampak telinga)",
      "Formulir data biometrik"
    ],
    flow: [
      "Mengambil formulir di ruang Inafis / Satreskrim",
      "Perekaman 10 sidik jari menggunakan tinta khusus",
      "Perumusan pola rumus sidik jari oleh petugas",
      "Penyerahan Kartu Rumus Sidik Jari"
    ],
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
    requirements: [
      "Surat Permohonan dari Panitia / Penanggung Jawab",
      "Proposal Kegiatan & Susunan Acara",
      "Surat Pengantar dari Kelurahan & Kecamatan setempat",
      "Fotokopi KTP Ketua Panitia",
      "Denah lokasi kegiatan & persetujuan warga sekitar"
    ],
    flow: [
      "Menyerahkan berkas permohonan ke Unit Intelkam Polsek",
      "Analisis kerawanan & koordinasi keamanan lokasi",
      "Penerbitan Surat Rekomendasi / Surat Izin Keramaian"
    ],
    icon: "FileCheck",
    status: "Aktif"
  }
];
