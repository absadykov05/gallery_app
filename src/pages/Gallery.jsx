import { useState } from "react";
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

function ImageCard({ src, onFavorite, onDelete, isFavorite }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f3f4f6"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={src}
                alt="image"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                    transform: hovered ? "scale(1.05)" : "scale(1)"
                }}
            />

            {hovered && (
                <>
                    <button
                        onClick={() => onFavorite(src)}
                        style={{
                            all: "unset",
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                            backgroundColor: "transparent",
                            padding: "6px",
                            borderRadius: "50%",
                            zIndex: 10,
                            cursor: "pointer",
                            color: "#fff",
                        }}
                    >
                        {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                    </button>
                    <button
                        onClick={() => onDelete(src)}
                        style={{
                            all: "unset",
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            backgroundColor: "transparent",
                            padding: "6px",
                            zIndex: 10,
                            cursor: "pointer",
                            color: "#fff",
                        }}
                    >
                        <FaTrash size={16} />
                    </button>
                </>
            )}
        </div>
    );
}

export default function Gallery() {
    const allImages = useLiveQuery(() => db.images.toArray(), []);
    const favorites = useLiveQuery(() => db.favorites.toArray(), []);
    const [view, setView] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        const toBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });

        const base64Images = await Promise.all(files.map(file => toBase64(file)));
        for (const src of base64Images) {
            const hashtag = prompt("Введите хэштег для изображения:");
            await db.images.add({ src, isGenerated: false, hashtag });
        }
    };

    const handleFavorite = async (src) => {
        const exists = await db.favorites.where({ src }).count();
        if (exists) {
            const items = await db.favorites.where({ src }).toArray();
            for (const item of items) {
                await db.favorites.delete(item.id);
            }
        } else {
            await db.favorites.add({ src });
        }
    };

    const handleDelete = async (src) => {
        const toDelete = await db.images.where({ src }).toArray();
        for (const item of toDelete) {
            await db.images.
            delete(item.id);
        }
        const toDeleteFav = await db.favorites.where({ src }).toArray();
        for (const item of toDeleteFav) {
            await db.favorites.delete(item.id);
        }
    };

    const filteredImages = allImages
        ?.filter(img => {
            if (view === "favorites") return favorites?.some(fav => fav.src === img.src);
            if (view === "generated") return img.isGenerated;
            return true;
        })
        .filter(img =>
            !searchTerm || (img.hashtag || "").toLowerCase().includes(searchTerm.toLowerCase())
);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="z-10 bg-white px-4 pt-2">
                <h2 className="text-2xl font-semibold mb-2" style={{marginLeft: 5}}>Моя галерея</h2>

                <div className="flex" style={{marginLeft: 5, marginTop: -10, justifyContent: 'center'}}>
                    <div className="flex" style={{gap: 5}}>
                        <button onClick={() => setView("all")}
                                className={`px-4 py-2 rounded`}
                                style={{
                                    backgroundColor: view === "all" ? "#6b7280" : "",
                                    color: "#ffffff",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                }}>Все
                        </button>
                        <button onClick={() => setView("favorites")}
                                className={`px-4 py-2 rounded`}
                                style={{
                                    backgroundColor: view === "favorites" ? "#6b7280" : "",
                                    color: "#ffffff",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                }}>Избранные
                        </button>
                        <button onClick={() => setView("generated")}
                                className={`px-4 py-2 rounded`}
                                style={{
                                    backgroundColor: view === "generated" ? "#6b7280" : "",
                                    color: "#ffffff",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    outline: "none",
                                    boxShadow: "none",
                                }}>Сгенерированные
                        </button>
                    </div>
                    <input style={{
                        width: "20%",
                        height: '30px',
                        marginTop: 5,
                        marginRight: 5,
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        outline: 'none',
                        fontSize: '1rem',
                    }}
                           type="text"
                           placeholder="Поиск по хэштегу"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-auto px-3 py-2 border border-gray-300 rounded w-1/3"
                    />
                </div>

                <div className="my-2" style={{marginLeft: 5, marginTop: 5, marginBottom: 5}}>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4 px-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 139px)' }}>
                {filteredImages?.map(({ src }, idx) => (
                    <ImageCard
                        key={idx}
                        src={src}
                        onFavorite={handleFavorite}
                        onDelete={handleDelete}
                        isFavorite={view === "favorites" || favorites?.some(fav => fav.src === src)}
                    />
                ))}
            </div>
        </div>
    );
}
