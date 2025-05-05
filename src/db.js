// src/db.js
import Dexie from "dexie";

export const db = new Dexie("galleryDB");
db.version(1).stores({
    images: "++id, src",
    favorites: "++id, src"
});

export async function addImageToGallery(src) {
    await db.images.add({ src });
}
