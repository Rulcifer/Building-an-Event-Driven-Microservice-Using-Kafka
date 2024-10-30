## Cara Menjalankan Proyek

### Prasyarat

- **Docker dan Docker Compose**
- **Node.js** (pastikan Node.js dan npm sudah terpasang)

### Langkah Menjalankan

1. Jalankan Kafka dan Zookeeper menggunakan Docker:
   ```bash
   npm install
   docker-compose up -d
   ```
2. Menjalankan producer:
   node producer.js
3. Menjalankan consumer:
   node consumer.js

### Pilihan Desain Kunci

- **Kafka** dipilih karena mampu menangani banyak pesan dengan cepat, cocok untuk sistem yang membutuhkan pemrosesan pesan yang andal.
- Menggunakan **Zookeeper** untuk membantu mengelola broker Kafka, meskipun Kafka bisa berjalan tanpa Zookeeper.
- Menggunakan **offset tracking** untuk memastikan pesan yang telah diproses tidak diproses ulang.
- **Auto-commit** diaktifkan secara default, sehingga Kafka secara otomatis menyimpan offset pesan yang telah diproses.

### Strategi Penanganan Kesalahan

- Jika ada kesalahan saat memproses pesan, konsumen akan mencatat kesalahan tersebut dan mencoba lagi tanpa menghentikan proses.
- Menyediakan **logging** untuk mencatat pesan yang berhasil diproses dan pesan yang gagal.

### Perbaikan yang Akan Datang

- Menambahkan **retry logic** untuk menangani pesan yang gagal diproses beberapa kali.
