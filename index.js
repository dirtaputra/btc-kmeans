const express = require('express');
const cors = require('cors'); // Import library CORS
const axios = require('axios');

const app = express();

// Aktifkan CORS
app.use(cors());

// Fungsi untuk menghitung jarak Euclidean
function calculateDistance(point1, point2) {
    return Math.sqrt(
        point1.reduce((sum, value, index) => sum + Math.pow(value - point2[index], 2), 0)
    );
}

// Fungsi untuk menentukan cluster berdasarkan centroid terdekat
function assignClusters(data, centroids) {
    return data.map(point => {
        const distances = centroids.map(centroid => calculateDistance(point, centroid));
        return distances.indexOf(Math.min(...distances));
    });
}

// Fungsi untuk memperbarui centroid berdasarkan rata-rata data di setiap cluster
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

// Fungsi untuk mengambil data harga Bitcoin
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

// Fungsi utama untuk menganalisis data menggunakan K-Means
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

app.get('/data', async (req, res) => {
    const { results } = await analyzeBitcoinData();
    res.json(results);
});

app.use(express.static('public'));  // Untuk file HTML dan JS frontend
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
