async function kirimJawaban(person, answer) {
    try {
        await fetch('/api/jawaban', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, answer })
        });
        // Jika berhasil, lanjut ke halaman terima kasih
        window.location.href = "thankyou.html";
    } catch (error) {
        alert('Oops, ada masalah. Coba lagi.');
    }
}