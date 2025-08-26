async function kirimJadwal() {
    // Ambil nilai dari input tanggal dan jam
    const tanggal = document.getElementById('date').value;
    const jam = document.getElementById('time').value;

    // Validasi sederhana agar tidak kosong
    if (!tanggal) {
        alert("Jangan lupa pilih tanggalnya ya!");
        return; // Hentikan fungsi jika tanggal kosong
    }

    // Kirim data ke backend menggunakan fetch
    try {
        await fetch('/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tanggal: tanggal, jam: jam })
        });
        
        // Jika berhasil terkirim, langsung pindah ke halaman pertanyaan
        window.location.href = "ask_cia.html";

    } catch (error) {
        console.error('Gagal mengirim jadwal:', error);
        alert('Oops, ada masalah saat menyimpan jadwal. Coba lagi.');
    }
}