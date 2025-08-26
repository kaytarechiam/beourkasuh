async function kirimJawaban(pilihan) {
    // Tampilkan konfirmasi sebelum mengirim
    if (!confirm('Apakah kamu yakin dengan pilihan ini?')) {
        return; // Jika pengguna klik "Cancel", hentikan fungsi
    }

    try {
        await fetch('/api/jawaban', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jawaban: pilihan })
        });
        
        // Jika berhasil, arahkan ke halaman terima kasih
        window.location.href = "thankyou.html";

    } catch (error) {
        console.error('Gagal mengirim jawaban:', error);
        alert('Oops, ada masalah saat mengirim jawabanmu. Coba lagi.');
    }
}