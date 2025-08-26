// Fungsi ini akan dipanggil saat tombol "Masuk" diklik
async function checkLogin() {
    // 1. Ambil teks yang diketik oleh pengguna di kotak input
    const inputPanggilan = document.getElementById('nickname').value;

    // 2. Kirim data ini ke backend menggunakan 'fetch'
    try {
        const response = await fetch('/api/login', {
            method: 'POST', // Metode POST digunakan untuk mengirim data
            headers: {
                // Beri tahu server bahwa data yang kita kirim berformat JSON
                'Content-Type': 'application/json'
            },
            // Ubah data kita menjadi format string JSON
            body: JSON.stringify({ panggilan: inputPanggilan })
        });

        // 3. Periksa respons dari server
        if (response.ok) { // 'ok' berarti berhasil (status code 200-299)
            // Jika berhasil, arahkan ke halaman opening
            window.location.href = "opening.html";
        } else {
            // Jika gagal (misal, password salah), tampilkan pesan error
            const dataError = await response.json();
            alert(dataError.message); // Tampilkan pesan error dari server
        }
    } catch (error) {
        // Ini untuk menangani jika ada masalah jaringan atau server tidak aktif
        console.error('Tidak bisa terhubung ke server:', error);
        alert('Oops, sepertinya ada masalah koneksi. Coba lagi nanti.');
    }
}