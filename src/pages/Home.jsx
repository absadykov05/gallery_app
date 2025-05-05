import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; // путь подставь правильно

const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Ошибка авторизации:", error);
    }
};

export default function Home() {
    return (
        <div className="min-h-screen w-screen flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Добро пожаловать в AI Memories Gallery</h1>
            <p className="text-gray-600 text-lg mb-8">Загружайте фото или создавайте изображения с помощью ИИ</p>
            <div className="space-x-4" style={{ display: "flex", gap: "10px" }}>
                <a href="/gallery" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Галерея</a>
                <a href="/generate" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Генерация</a>
            </div>
        </div>
    );
}
