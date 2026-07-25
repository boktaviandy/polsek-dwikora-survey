import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (surveys, filename = 'Hasil_Survey_Polsek_Dwikora.csv') => {
  if (!surveys || surveys.length === 0) return;

  const headers = ['ID', 'Tanggal', 'Nama Lengkap', 'Nomor HP', 'Jenis Kelamin', 'Jenis Pelayanan', 'Kritik & Saran'];
  const rows = surveys.map(s => [
    s.id,
    new Date(s.createdAt).toLocaleDateString('id-ID'),
    `"${s.nama || ''}"`,
    `"${s.noHp || ''}"`,
    s.jenisKelamin || '',
    s.jenisPelayanan || '',
    `"${(s.kritiksaran || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (surveys, filename = 'Hasil_Survey_Polsek_Dwikora.xlsx') => {
  if (!surveys || surveys.length === 0) return;

  const formattedData = surveys.map(s => ({
    ID: s.id,
    Tanggal: new Date(s.createdAt).toLocaleString('id-ID'),
    'Nama Lengkap': s.nama,
    'Nomor HP': s.noHp,
    'Jenis Kelamin': s.jenisKelamin,
    'Jenis Pelayanan': s.jenisPelayanan,
    'Q1 Keramahan': s.answers?.q1 || '-',
    'Q2 Kecepatan': s.answers?.q2 || '-',
    'Q3 Prosedur': s.answers?.q3 || '-',
    'Q4 Fasilitas': s.answers?.q4 || '-',
    'Q5 Harapan': s.answers?.q5 || '-',
    'Kritik & Saran': s.kritiksaran || '-'
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Hasil Survey');
  XLSX.writeFile(workbook, filename);
};

export const exportToPDF = (surveys, filename = 'Laporan_Survey_Polsek_Dwikora.pdf') => {
  if (!surveys || surveys.length === 0) return;

  const doc = new jsPDF('landscape');

  // Header PDF
  doc.setFontSize(16);
  doc.setTextColor(15, 32, 39);
  doc.text('LAPORAN HASIL SURVEI KEPUASAN MASYARAKAT', 14, 15);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text('Polsek Dwikora Pontianak - Polresta Pontianak', 14, 22);
  doc.text(`Dicetak pada: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}`, 14, 28);

  const tableColumn = ['ID', 'Tanggal', 'Nama Responden', 'No. HP', 'Gender', 'Pelayanan', 'Kepuasan Rata-rata', 'Kritik & Saran'];
  const tableRows = surveys.map(s => {
    const answers = Object.values(s.answers || {});
    const baikCount = answers.filter(a => a === 'Sangat Baik' || a === 'Baik').length;
    const score = answers.length ? `${Math.round((baikCount / answers.length) * 100)}% Baik` : '-';

    return [
      s.id,
      new Date(s.createdAt).toLocaleDateString('id-ID'),
      s.nama,
      s.noHp,
      s.jenisKelamin,
      s.jenisPelayanan,
      score,
      s.kritiksaran || '-'
    ];
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 34,
    theme: 'grid',
    headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { fontSize: 9, cellPadding: 3 }
  });

  doc.save(filename);
};
