import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase"; // Убедись, что это путь к конфигурации Firebase
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/gallery");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Вход в GalleryApp</h1>
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Войти с Google
                </button>
            </div>
        </div>
    );
}
