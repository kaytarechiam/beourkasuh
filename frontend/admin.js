// Fungsi untuk mengambil status jawaban dari server
async function getStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Tampilkan jawaban di halaman
        document.getElementById('jawabanDisplay').textContent = data.jawaban;

    } catch (error) {
        console.error('Gagal mengambil status:', error);
        document.getElementById('jawabanDisplay').textContent = "Gagal memuat status.";
    }
}

// Fungsi untuk mereset jawaban
async function resetJawaban() {
    // Tampilkan konfirmasi
    if (!confirm('Yakin mau mengosongkan jawaban? Ini untuk keperluan testing.')) {
        return;
    }

    try {
        const response = await fetch('/api/reset', { method: 'POST' });
        const data = await response.json();

        alert(data.message); // Tampilkan pesan sukses dari server
        getStatus(); // Muat ulang status untuk melihat perubahannya

    } catch (error) {
        console.error('Gagal mereset jawaban:', error);
        alert('Oops, gagal mereset jawaban.');
    }
}

// Panggil fungsi getStatus() saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', getStatus);