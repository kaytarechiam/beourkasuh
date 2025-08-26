async function getStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Menampilkan jawaban
        document.getElementById('jawabanCiw').textContent = data.jawaban_cia || "Belum ada jawaban";
        document.getElementById('jawabanKei').textContent = data.jawaban_kei || "Belum ada jawaban";
        
        // MENAMPILKAN TANGGAL DAN JAM
        // Mengubah format tanggal agar lebih mudah dibaca
        let tanggalFormatted = "Belum ditentukan";
        if (data.tanggal_janji) {
            tanggalFormatted = new Date(data.tanggal_janji).toLocaleDateString('id-ID', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
        
        document.getElementById('displayTanggal').textContent = tanggalFormatted;
        document.getElementById('displayJam').textContent = data.jam_janji || "Belum ditentukan";

    } catch (error) {
        // ... (error handling tidak berubah) ...
        document.getElementById('jawabanCiw').textContent = "Gagal memuat.";
        document.getElementById('jawabanKei').textContent = "Gagal memuat.";
        document.getElementById('displayTanggal').textContent = "Gagal memuat.";
        document.getElementById('displayJam').textContent = "Gagal memuat.";
    }
}

async function resetJawaban() {
    // ... (fungsi reset tidak berubah) ...
    if (!confirm('Yakin mau mengosongkan semua jawaban dan jadwal?')) return;
    try {
        const response = await fetch('/api/reset', { method: 'POST' });
        const data = await response.json();
        alert(data.message);
        getStatus();
    } catch (error) {
        alert('Oops, gagal mereset data.');
    }
}

document.addEventListener('DOMContentLoaded', getStatus);