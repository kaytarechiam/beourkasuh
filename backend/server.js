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

// === ROUTE LOGIN ===
app.post('/api/login', (req, res) => {
    const { panggilan } = req.body;
    const sanitizedPanggilan = panggilan.toLowerCase();
    if (sanitizedPanggilan === 'ciamoroll' || sanitizedPanggilan === 'ciwkei') {
        res.status(200).json({ success: true, message: 'Login berhasil!' });
    } else {
        res.status(401).json({ success: false, message: 'Panggilan salah!' });
    }
});

// === ROUTE JAWABAN ===
app.post('/api/jawaban', async (req, res) => {
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

// === ROUTE STATUS (DISEDERHANAKAN) ===
app.get('/api/status', async (req, res) => {
    try {
        const result = await pool.query('SELECT jawaban_cia, jawaban_kei FROM status WHERE id = 1');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Gagal mengambil status dari DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// === ROUTE RESET (DISEDERHANAKAN) ===
app.post('/api/reset', async (req, res) => {
    try {
        await pool.query("UPDATE status SET jawaban_cia = 'Belum ada jawaban', jawaban_kei = 'Belum ada jawaban' WHERE id = 1");
        console.log('Semua data jawaban telah direset oleh admin.');
        res.status(200).json({ message: 'Semua data jawaban berhasil dikosongkan.' });
    } catch (error) {
        console.error('Gagal mereset DB:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});