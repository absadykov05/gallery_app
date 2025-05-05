// src/db.js
import Dexie from "dexie";

export const db = new Dexie("galleryDB");
db.version(1).stores({
    images: "++id, src",
    favorites: "++id, src"
});

export async function addImageToGallery(src, hashtag = "", isGenerated = false) {
    await db.images.add({ src, hashtag, isGenerated });
}
