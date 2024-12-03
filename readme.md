# Bitcoin K-Means Clustering Visualization

## **Deskripsi**
Proyek ini adalah aplikasi berbasis **Node.js** dan **Chart.js** untuk menganalisis data harga Bitcoin menggunakan algoritma **K-Means Clustering**. Hasil analisis ditampilkan dalam bentuk visualisasi scatter plot yang memetakan harga pembukaan (**open price**) dan penutupan (**close price**) Bitcoin selama 30 hari terakhir.

Aplikasi ini dirancang untuk memberikan wawasan tentang pola harga Bitcoin berdasarkan data historis, seperti hari-hari dengan harga tinggi, sedang, atau rendah.

---

## **Tujuan**
1. **Analisis Pola Harga Bitcoin**:
   - Mengelompokkan data harga Bitcoin ke dalam 3 cluster berdasarkan harga pembukaan, harga penutupan, dan volume perdagangan.
2. **Visualisasi Interaktif**:
   - Menampilkan hasil clustering dalam scatter plot yang mudah dipahami.
3. **Belajar Machine Learning**:
   - Menggunakan algoritma K-Means untuk memahami cara kerja clustering.

---

## **Fitur**
- Ambil data historis Bitcoin selama 30 hari terakhir dari API CoinGecko.
- Jalankan algoritma **K-Means Clustering** untuk menganalisis pola harga.
- Visualisasi hasil clustering menggunakan **Chart.js** di browser.

---

## **Cara Membaca Diagram Scatter Plot**

### **1. Sumbu Diagram**
- **Sumbu X (Horizontal)**:
  - Merepresentasikan harga pembukaan (**Open Price**) Bitcoin.
  - Harga pembukaan adalah harga awal Bitcoin saat mulai diperdagangkan pada hari tertentu.
- **Sumbu Y (Vertical)**:
  - Merepresentasikan harga penutupan (**Close Price**) Bitcoin.
  - Harga penutupan adalah harga akhir Bitcoin pada akhir hari perdagangan.

### **2. Warna Cluster**
- **Cluster 0 (Merah)**:
  - Hari-hari dengan pola harga **rendah** untuk pembukaan dan penutupan.
  - Cluster ini biasanya menunjukkan aktivitas pasar yang tenang atau bearish.
- **Cluster 1 (Biru)**:
  - Hari-hari dengan pola harga **sedang**.
  - Merepresentasikan kondisi pasar yang stabil atau normal.
- **Cluster 2 (Hijau)**:
  - Hari-hari dengan pola harga **tinggi**.
  - Biasanya terjadi selama periode bullish atau lonjakan harga signifikan.

### **3. Pola dalam Diagram**
- **Diagonal Lurus**:
  - Titik-titik dalam scatter plot cenderung membentuk garis diagonal karena adanya korelasi positif antara harga pembukaan dan penutupan (harga tinggi di pembukaan sering diikuti harga tinggi di penutupan, dan sebaliknya).
- **Penyebaran Data dalam Cluster**:
  - Cluster merah (harga rendah) cenderung di bagian bawah.
  - Cluster biru (harga sedang) berada di tengah.
  - Cluster hijau (harga tinggi) berada di bagian atas.

### **4. Interpretasi**
- **Cluster 0 (Merah)**:
  - Hari dengan aktivitas pasar yang tenang atau harga Bitcoin rendah.
- **Cluster 1 (Biru)**:
  - Hari-hari di mana harga Bitcoin mendekati rata-rata pasar.
- **Cluster 2 (Hijau)**:
  - Hari-hari di mana Bitcoin mencapai harga tinggi, biasanya terkait dengan tren bullish atau volume tinggi.

### **5. Analisis Tambahan**
- **Identifikasi Hari Penting**:
  - Perhatikan hari-hari yang masuk ke **Cluster 2 (Hijau)** untuk mengetahui waktu di mana Bitcoin berada pada harga tinggi.
- **Trend Pasar**:
  - Jika banyak data berada di **Cluster 1 (Biru)**, pasar mungkin stabil.
  - Dominasi cluster merah menunjukkan tren bearish, sementara dominasi hijau menunjukkan tren bullish.

---

## **Instalasi**

### **1. Clone Repository**
Clone proyek ini ke komputer lokal Anda:
```bash
git clone https://github.com/dirtaputra/btc-kmeans.git
cd btc-kmeans
```

### **2. Instal Dependencies**
Instal dependensi Node.js yang diperlukan:
```bash
npm install
```

### **3. Struktur Folder**
- **index.js**: Backend Node.js untuk mengambil data dan menjalankan K-Means.
- **public/index.html**: Frontend untuk menampilkan visualisasi scatter plot.
- **package.json**: File konfigurasi proyek.

### **4. Jalankan Server**
Jalankan backend server Node.js:
```bash
node index.js
```

Server akan berjalan di `http://localhost:3000`.

### **5. Akses Frontend**
Buka browser dan akses file **`index.html`** menggunakan salah satu opsi berikut:
- Gunakan **Live Server** dari Visual Studio Code.
- Jalankan server lokal menggunakan Python:
  ```bash
  python -m http.server 8000
  ```
  Kemudian buka `http://localhost:8000` di browser.

---

## **Hasil**
Visualisasi scatter plot akan menampilkan:
- **Sumbu X**: Harga pembukaan (Open Price).
- **Sumbu Y**: Harga penutupan (Close Price).
- **Warna**: Setiap cluster diberi warna berbeda untuk mempermudah interpretasi.
- **Pola**: Data tersebar dalam kelompok harga rendah (merah), sedang (biru), dan tinggi (hijau).

---

## **Teknologi yang Digunakan**
- **Backend**:
  - Node.js
  - Express
  - Axios
- **Frontend**:
  - HTML
  - Chart.js
- **API**:
  - [CoinGecko API](https://www.coingecko.com/)

---

## **Catatan**
- Pastikan Anda terhubung ke internet untuk mengambil data dari CoinGecko.
- Jika mengalami masalah **CORS**, gunakan middleware **cors** di backend Node.js.

---

## **Lisensi**
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---