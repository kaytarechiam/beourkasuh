async function getStatus() {
    try {
        const response = await fetch('/api/status');
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari server');
        }
        const data = await response.json();
        
        // Menampilkan jawaban
        document.getElementById('jawabanCiw').textContent = data.jawaban_cia || "Belum ada jawaban";
        document.getElementById('jawabanKei').textContent = data.jawaban_kei || "Belum ada jawaban";
        
    } catch (error) {
        console.error('Error saat memuat status:', error);
        document.getElementById('jawabanCiw').textContent = "Gagal memuat.";
        document.getElementById('jawabanKei').textContent = "Gagal memuat.";
    }
}

async function resetJawaban() {
    if (!confirm('Yakin mau mengosongkan semua jawaban?')) return;
    try {
        const response = await fetch('/api/reset', { method: 'POST' });
        const data = await response.json();
        alert(data.message);
        getStatus(); // Muat ulang status untuk melihat perubahannya
    } catch (error) {
        alert('Oops, gagal mereset data.');
    }
}

document.addEventListener('DOMContentLoaded', getStatus);