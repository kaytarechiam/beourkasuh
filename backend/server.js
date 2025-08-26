const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const CONNECTION_STRING = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
});

const PORT = process.env.PORT || 3000;

// === ROUTE LOGIN (TETAP SAMA) ===
app.post('/api/login', (req, res) => {
    // ... (kode login tidak berubah) ...
    const { panggilan } = req.body;
    const sanitizedPanggilan = panggilan.toLowerCase();
    if (sanitizedPanggilan === 'ciamoroll' || sanitizedPanggilan === 'ciwkei') {
        res.status(200).json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Panggilan salah!' });
    }
});


// === ROUTE JADWAL (DIMODIFIKASI UNTUK MENYIMPAN TANGGAL & JAM) ===
app.post('/api/schedule', async (req, res) => {
    const { tanggal, jam } = req.body;

    try {
        // Query untuk UPDATE tanggal dan jam janji di database
        await pool.query('UPDATE status SET tanggal_janji = $1, jam_janji = $2 WHERE id = 1', [tanggal, jam]);
        console.log(`Jadwal disimpan: Tanggal ${tanggal}, Jam ${jam}`);
        res.status(200).json({ message: 'Jadwal berhasil disimpan!' });
    } catch (error) {
        console.error('Gagal menyimpan jadwal ke DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// === ROUTE JAWABAN (TETAP SAMA) ===
app.post('/api/jawaban', async (req, res) => {
    // ... (kode jawaban tidak berubah) ...
    const { person, answer } = req.body;
    const columnToUpdate = person === 'cia' ? 'jawaban_cia' : 'jawaban_kei';
    try {
        await pool.query(`UPDATE status SET ${columnToUpdate} = $1 WHERE id = 1`, [answer]);
        console.log(`Jawaban untuk ${person} telah disimpan: ${answer}`);
        res.status(200).json({ message: 'Jawaban berhasil disimpan!' });
    } catch (error) {
        console.error('Gagal update database:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// === ROUTE STATUS (DIMODIFIKASI UNTUK MENGAMBIL TANGGAL & JAM) ===
app.get('/api/status', async (req, res) => {
    try {
        // Query untuk mengambil semua data dari baris pertama
        const result = await pool.query('SELECT jawaban_cia, jawaban_kei, tanggal_janji, jam_janji FROM status WHERE id = 1');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Gagal mengambil status dari DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// === ROUTE RESET (DIMODIFIKASI UNTUK MERESET TANGGAL & JAM) ===
app.post('/api/reset', async (req, res) => {
    try {
        // Query untuk mereset semua jawaban dan jadwal
        await pool.query("UPDATE status SET jawaban_cia = 'Belum ada jawaban', jawaban_kei = 'Belum ada jawaban', tanggal_janji = NULL, jam_janji = NULL WHERE id = 1");
        console.log('Semua data telah direset oleh admin.');
        res.status(200).json({ message: 'Semua data berhasil dikosongkan.' });
    } catch (error) {
        console.error('Gagal mereset DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});