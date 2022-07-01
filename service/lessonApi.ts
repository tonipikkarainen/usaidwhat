import { db } from '../firebase';
import {
    collection,
    addDoc,
    Timestamp,
    query,
    where,
    getDocs,
    QuerySnapshot,
    DocumentData,
} from 'firebase/firestore';

export const createLesson = async (userId: string, lessonName: string) => {
    const lessonsRef = collection(db, 'lessons');
    const data = {
        name: lessonName,
        ownerId: userId,
        createdAt: Timestamp.now(),
    };
    // Mitä tekee setDoc, jos userId on jo olemassa?
    try {
        await addDoc(lessonsRef, data);
        console.log('created lesson ' + userId + lessonName);
    } catch (error) {
        console.error(error);
    }
};

export const getLessonsByUser = async (userId: string) => {
    const q = query(collection(db, 'lessons'), where('ownerId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
    });
};
