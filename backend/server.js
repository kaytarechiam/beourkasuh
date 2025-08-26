const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// === ROUTE LOGIN (SUDAH ADA) ===
app.post('/api/login', (req, res) => {
    const { panggilan } = req.body;
    if (panggilan.toLowerCase() === 'sayang') { // Dibuat case-insensitive
        res.status(200).json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Panggilan salah!' });
    }
});

// === ROUTE JADWAL (BARU) ===
app.post('/api/schedule', (req, res) => {
    const { tanggal, jam } = req.body;

    // Di dunia nyata, ini akan disimpan ke database.
    // Untuk sekarang, kita tampilkan saja di konsol backend.
    console.log(`Jadwal diterima: Tanggal ${tanggal}, Jam ${jam}`);
    
    // Kirim respons bahwa data sudah diterima
    res.status(200).json({ message: 'Jadwal diterima' });
});


// === ROUTE JAWABAN (BARU) ===
app.post('/api/jawaban', (req, res) => {
    const { jawaban } = req.body;
    
    // Ini bagian penting! Kamu bisa melihat jawabannya di sini (di log terminal)
    console.log('===================================');
    console.log('JAWABAN AKHIR TELAH DITERIMA!');
    console.log(`Pilihan dia adalah: "${jawaban}"`);
    console.log('===================================');
    
    res.status(200).json({ message: 'Jawabanmu sudah kusimpan di hati <3' });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});