import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const encodedPrompt = encodeURIComponent(prompt.trim());
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
        res.json({ image: imageUrl });
    } catch (error) {
        console.error('Ошибка генерации:', error.message);
        res.status(500).json({ error: 'Ошибка генерации изображения' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));
