import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Метод не поддерживается" });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Промпт обязателен" });
    }

    try {
        // Используем Pollinations API или другой
        const response = await axios.get(
            https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}
    );

        return res.status(200).json({ image: response.request.res.responseUrl });
    } catch (error) {
        console.error("Ошибка генерации:", error);
        return res.status(500).json({ message: "Ошибка генерации" });
    }
}
