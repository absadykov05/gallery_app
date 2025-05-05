import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Header({ user }) {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return (
        <header
            className="w-full flex justify-between items-center px-6 py-3 bg-white shadow fixed z-50">
            <div className="flex gap-4 text-blue-600 font-medium">
            </div>
            {user && (
                <div className="flex items-center" style={{margin: 5, gap: 10}}>
                    <span className="text-sm text-gray-600">{user.email}</span>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        Выйти
                    </button>
                </div>
            )}
        </header>
    );
}
