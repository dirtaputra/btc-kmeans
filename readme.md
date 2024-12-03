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

Berikut adalah penjelasan terperinci untuk setiap bagian kode Anda:

---

### **Import dan Setup**
```javascript
const express = require('express');  // Import library Express untuk membuat server HTTP.
const cors = require('cors');       // Import library CORS untuk menangani permintaan lintas domain.
const axios = require('axios');     // Import library Axios untuk melakukan HTTP request ke API eksternal.

const app = express();  // Inisialisasi aplikasi Express.
app.use(cors());         // Aktifkan middleware CORS untuk mengizinkan semua permintaan lintas domain.
```

**Penjelasan**:
- **Express**: Digunakan untuk membuat server backend yang mendengarkan permintaan HTTP.
- **CORS**: Digunakan agar browser mengizinkan akses dari domain berbeda (frontend ke backend).
- **Axios**: Mempermudah pengambilan data dari API eksternal, seperti CoinGecko.

---

### **Fungsi untuk Menghitung Jarak Euclidean**
```javascript
function calculateDistance(point1, point2) {
    return Math.sqrt(
        point1.reduce((sum, value, index) => sum + Math.pow(value - point2[index], 2), 0)
    );
}
```

**Penjelasan**:
- Menghitung jarak antara dua titik dalam ruang multidimensi.
- Digunakan oleh algoritma **K-Means** untuk menentukan titik mana yang paling dekat dengan sebuah centroid.
- **point1** dan **point2** adalah array angka, seperti `[open, close, volume]`.

---

### **Fungsi untuk Menentukan Cluster**
```javascript
function assignClusters(data, centroids) {
    return data.map(point => {
        const distances = centroids.map(centroid => calculateDistance(point, centroid));
        return distances.indexOf(Math.min(...distances));
    });
}
```

**Penjelasan**:
- **data**: Array data yang ingin dikelompokkan, seperti `[open, close, volume]`.
- **centroids**: Array centroid awal.
- Untuk setiap data (`point`):
  1. Hitung jarak dari data ke semua centroid menggunakan `calculateDistance`.
  2. Tentukan cluster terdekat berdasarkan centroid dengan jarak terpendek.

---

### **Fungsi untuk Memperbarui Centroid**
```javascript
function updateCentroids(data, clusters, K) {
    const newCentroids = Array(K).fill(null).map(() => Array(data[0].length).fill(0));
    const counts = Array(K).fill(0);

    data.forEach((point, index) => {
        const cluster = clusters[index];
        counts[cluster]++;
        point.forEach((value, dimension) => {
            newCentroids[cluster][dimension] += value;
        });
    });

    return newCentroids.map((centroid, index) =>
        centroid.map(value => (counts[index] === 0 ? 0 : value / counts[index]))
    );
}
```

**Penjelasan**:
- Menghitung centroid baru berdasarkan rata-rata semua titik dalam cluster.
1. **`newCentroids`**: Array kosong untuk menyimpan centroid baru.
2. Untuk setiap data:
   - Tambahkan data ke centroid cluster yang sesuai.
   - Hitung rata-rata di akhir untuk menentukan lokasi centroid baru.

---

### **Fungsi untuk Mengambil Data Harga Bitcoin**
```javascript
async function fetchBitcoinData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
            params: {
                vs_currency: 'usd',
                days: 30, // Data 30 hari terakhir
            },
        });

        const prices = response.data.prices.map((price, index) => ({
            day: index + 1,
            open: price[1],
            close: price[1] + Math.random() * 100, // Simulasi harga penutupan
            volume: Math.random() * 5000, // Simulasi volume perdagangan
        }));

        return prices;
    } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
        return [];
    }
}
```

**Penjelasan**:
- Mengambil data harga Bitcoin selama 30 hari terakhir dari CoinGecko.
- **response.data.prices**: Berisi array harga untuk setiap hari.
- Data diformat menjadi objek:
  - **`open`**: Harga pembukaan dari API.
  - **`close`**: Harga penutupan disimulasikan.
  - **`volume`**: Volume perdagangan disimulasikan.

---

### **Fungsi untuk Menjalankan K-Means**
```javascript
async function analyzeBitcoinData() {
    const data = await fetchBitcoinData();

    if (data.length === 0) {
        console.log('No data available.');
        return [];
    }

    const dataset = data.map(d => [d.open, d.close, d.volume]);

    // Jalankan K-Means dengan K=3
    const K = 3;
    const clusters = assignClusters(dataset, dataset.slice(0, K));
    const centroids = updateCentroids(dataset, clusters, K);

    const results = data.map((d, i) => ({
        ...d,
        cluster: clusters[i],
    }));

    return {
        results,
        centroids
    };
}
```

**Penjelasan**:
1. Ambil data dari API dengan **fetchBitcoinData**.
2. Siapkan dataset dalam bentuk `[open, close, volume]`.
3. Jalankan algoritma K-Means:
   - Tentukan **K=3** untuk 3 cluster.
   - Tentukan cluster awal dengan `assignClusters`.
   - Perbarui centroid dengan `updateCentroids`.
4. Gabungkan hasil cluster dengan data asli.

---

### **Endpoint Backend**
```javascript
app.get('/data', async (req, res) => {
    const { results } = await analyzeBitcoinData();
    res.json(results);
});
```

**Penjelasan**:
- Membuat endpoint `/data` yang akan:
  1. Menjalankan analisis K-Means melalui **analyzeBitcoinData**.
  2. Mengirimkan hasil dalam format JSON ke frontend.

---

### **Server**
```javascript
app.use(express.static('public'));  // Menyajikan file HTML dan JS frontend.
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

**Penjelasan**:
- **`express.static('public')`**:
  - Menyajikan file statis seperti HTML, CSS, dan JavaScript dari folder `public`.
- **`app.listen(3000)`**:
  - Menjalankan server di port `3000`.
  - Akses melalui `http://localhost:3000`.

---

### **Kesimpulan**
- **Fungsi Utama**:
  - Backend mengambil data harga Bitcoin dari API CoinGecko.
  - Data diolah menggunakan algoritma K-Means untuk menemukan pola.
  - Hasil dikirim ke frontend melalui endpoint `/data`.
- **Server**:
  - Menyediakan data dan frontend untuk memvisualisasikan hasil clustering.


## **Lisensi**
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---