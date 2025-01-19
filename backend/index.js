const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Upload handler
const upload = multer();

// Endpoint untuk deteksi gambar
app.post('/api/detect', upload.single('image'), async (req, res) => {
    try {
        const imageBase64 = req.file.buffer.toString('base64');
        const response = await axios.post(
            'https://detect.roboflow.com/american-sign-language-letters/6',
            imageBase64,
            {
                params: { api_key: 'hTZuf1D35gj1nUUY9SMe' },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
