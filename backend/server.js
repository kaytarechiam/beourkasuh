// Import library express
const express = require('express');
const app = express();

// Middleware untuk membaca data JSON dari request
app.use(express.json());

// PORT untuk server, Vercel akan mengaturnya secara otomatis
const PORT = process.env.PORT || 3000;

// Route untuk API login (contoh)
app.post('/api/login', (req, res) => {
    const { panggilan } = req.body;

    // Ganti "sayang" dengan panggilan rahasiamu
    if (panggilan === 'ciamorol') {
        res.status(200).json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Panggilan salah!' });
    }
});

// Route untuk API menyimpan jawaban
app.post('/api/jawaban', (req, res) => {
    const { jawaban } = req.body;
    
    // Di sini kamu bisa menyimpan jawabannya
    console.log(`Jawaban diterima: ${jawaban}`); 
    
    // Kirim respons berhasil
    res.status(200).json({ message: 'jawaban sudah di save <3' });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});