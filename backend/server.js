const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Variabel untuk menyimpan jawaban di memori server
let jawabanDisimpan = "Belum ada jawaban";

// === ROUTE LOGIN (TETAP SAMA) ===
app.post('/api/login', (req, res) => {
    const { panggilan } = req.body;
    const sanitizedPanggilan = panggilan.toLowerCase();

    if (sanitizedPanggilan === 'ciamoroll' || sanitizedPanggilan === 'ciwkei') {
        res.status(200).json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Panggilan salah!' });
    }
});

// === ROUTE JADWAL (TETAP SAMA) ===
app.post('/api/schedule', (req, res) => {
    const { tanggal, jam } = req.body;
    console.log(`Jadwal diterima: Tanggal ${tanggal}, Jam ${jam}`);
    res.status(200).json({ message: 'Jadwal diterima' });
});

// === ROUTE JAWABAN (DIMODIFIKASI) ===
// Sekarang menyimpan jawaban ke variabel
app.post('/api/jawaban', (req, res) => {
    const { jawaban } = req.body;
    jawabanDisimpan = jawaban; // Simpan jawaban di sini
    
    console.log('===================================');
    console.log('JAWABAN AKHIR TELAH DITERIMA!');
    console.log(`Pilihan dia adalah: "${jawabanDisimpan}"`);
    console.log('===================================');
    
    res.status(200).json({ message: 'Jawabanmu sudah kusimpan di hati <3' });
});

// === ROUTE BARU UNTUK ADMIN: MENDAPATKAN STATUS ===
app.get('/api/status', (req, res) => {
    // Mengirimkan jawaban yang saat ini disimpan
    res.status(200).json({ jawaban: jawabanDisimpan });
});

// === ROUTE BARU UNTUK ADMIN: MENGOSONGKAN JAWABAN ===
app.post('/api/reset', (req, res) => {
    jawabanDisimpan = "Belum ada jawaban"; // Reset jawaban
    console.log('Jawaban telah direset oleh admin.');
    res.status(200).json({ message: 'Jawaban berhasil dikosongkan.' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});