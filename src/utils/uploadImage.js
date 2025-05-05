import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, storage, db } from "../firebase";

export const uploadImageToFirebase = async (base64) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Пользователь не авторизован");

    // Конвертируем base64 в Blob
    const response = await fetch(base64);
    const blob = await response.blob();

    const fileName = `${user.uid}/${Date.now()}.jpg`;
    const storageRef = ref(storage, fileName);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    // Сохраняем ссылку в Firestore
    await addDoc(collection(db, "images"), {
        src: downloadURL,
        userId: user.uid,
        isFavorite: false,
        createdAt: serverTimestamp(),
    });

    return downloadURL;
};
