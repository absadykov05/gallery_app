import { useState } from "react";
import axios from "axios";
import { addImageToGallery } from "../db";

export default function Generate() {
    const [textPrompt, setTextPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState("");

    const handleGenerate = async () => {
        if (!textPrompt.trim()) return;

        setLoading(true);
        setGeneratedImage("");

        try {
            const res = await axios.post("http://localhost:5000/api/generate", {
                prompt: textPrompt,
            });
            setGeneratedImage(res.data.image);
        } catch (err) {
            console.error("Ошибка генерации:", err);
            alert("Не удалось сгенерировать изображение");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToGallery = async () => {
        if (generatedImage) {
            const hashtag = window.prompt("Введите хэштег для изображения:");
            if (hashtag !== null) {
                await addImageToGallery(generatedImage, hashtag, true);
                alert("Изображение добавлено в галерею!");
            }
        }
    };

    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center p-6 bg-gray-50">
            <h1 className="text-l font-bold mb-6">Генератор изображений</h1>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '32rem', width: '100%' }}>
                <input
                    type="text"
                    value={textPrompt}
                    onChange={(e) => setTextPrompt(e.target.value)}
                    placeholder="Введите описание..."
                    style={{
                        flexGrow: 1,
                        height: '42px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        outline: 'none',
                        fontSize: '1rem',
                    }}
                />
                <button
                    onClick={handleGenerate}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Сгенерировать
                </button>
            </div>

            {loading && <p className="mt-6 text-gray-500">Генерация изображения...</p>}

            {generatedImage && (
                <div className="mt-6 flex flex-col items-center">
                    <img
                        src={generatedImage}
                        alt="Сгенерированное изображение"
                        className="rounded shadow-md object-cover"
                        style={{width: "400px", height: "400px", marginTop: "10px"}}
                    />
                    <div className="flex flex-row items-center justify-center w-full"
                         style={{gap: "10px", marginTop: "10px"}} >
                        <button
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            onClick={async () => {
                                try {
                                    const response = await fetch(generatedImage);
                                    const blob = await response.blob();
                                    const url = URL.createObjectURL(blob);

                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = "generated-image.png";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);

                                    URL.revokeObjectURL(url);
                                } catch (error) {
                                    alert("Не удалось скачать изображение");
                                    console.error("Ошибка скачивания:", error);
                                }
                            }}

                        >
                            Скачать
                        </button>
                        <button
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            onClick={handleAddToGallery}
                        >
                            Добавить в галерею
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
