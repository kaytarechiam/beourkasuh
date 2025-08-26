async function getStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        document.getElementById('jawabanCiw').textContent = data.jawaban_cia;
        document.getElementById('jawabanKei').textContent = data.jawaban_kei;

    } catch (error) {
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
        getStatus();
    } catch (error) {
        alert('Oops, gagal mereset jawaban.');
    }
}

document.addEventListener('DOMContentLoaded', getStatus);