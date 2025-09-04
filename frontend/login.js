async function checkLogin() {
    const inputPanggilan = document.getElementById('nickname').value.toLowerCase(); // langsung ubah ke huruf kecil

    // Jika tidak diisi, jangan lakukan apa-apa
    if (!inputPanggilan) {
        alert("Jangan dikosongin dong panggilannya");
        return;
    }

    // Cek apakah login sebagai admin
    if (inputPanggilan === 'ciwkei') {
        window.location.href = "admin.html"; // Arahkan ke halaman admin
        return; // Hentikan fungsi di sini
    }

    // Logika login untuk pengguna biasa
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ panggilan: inputPanggilan })
        });

        if (response.ok) {
            window.location.href = "game.html";
        } else {
            const dataError = await response.json();
            alert(dataError.message);
        }
    } catch (error) {
        console.error('Tidak bisa terhubung ke server:', error);
        alert('Oops, sepertinya ada masalah koneksi. Coba lagi nanti.');
    }
}