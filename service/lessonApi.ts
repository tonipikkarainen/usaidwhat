import { db } from '../firebase';
import {
    collection,
    addDoc,
    Timestamp,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

export const createLesson = async (userId: string, lessonName: string) => {
    const lessonsRef = collection(db, 'lessons');
    let pin = Math.floor(1000 + Math.random() * 9000);
    console.log(pin);
    // Check that pin does not exist at least for open lessons
    //
    const data = {
        name: lessonName,
        ownerId: userId,
        createdAt: Timestamp.now(),
        pin: pin,
        isActive: true,
    };

    try {
        await addDoc(lessonsRef, data);
        console.log('created lesson ' + userId + lessonName);
    } catch (error) {
        console.error(error);
    }
};

export const setIsActive = async (id: string, isActive: boolean) => {
    const lessonsRef = doc(db, 'lessons', id);
    const toastId = toast.loading('Updating lesson...');

    try {
        await setDoc(lessonsRef, { isActive: isActive }, { merge: true });
        toast.success('Lesson updated!', {
            id: toastId,
        });
    } catch (error) {
        console.error(error);
        toast.error('error' + error, {
            id: toastId,
        });
    }
};

export const deleteLesson = async (id: string) => {
    const lessonsRef = doc(db, 'lessons', id);
    const toastId = toast.loading('Deleting lesson...');

    // getMessages
    const messageQuery = query(collection(db, `lessons/${id}/messages`));

    try {
        // Mahdollinen muistivuoto, jos paljon viestejä,
        // TODO: tee paremmin!
        const querySnapshot = await getDocs(messageQuery);
        if (querySnapshot) {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
                console.log('deleting message: ' + doc.id);
            });
        }

        await deleteDoc(lessonsRef);
        toast.success('Lesson deleted!', {
            id: toastId,
        });
    } catch (error) {
        console.error(error);
        toast.error('error' + error, {
            id: toastId,
        });
    }
};

export const createMessage = async (lessonId: string, message: string) => {
    const messagesRef = collection(db, `lessons/${lessonId}/messages`);
    const toastId = toast.loading('Sending a message...');

    // Check that pin does not exist at least for open lessons
    //
    console.log(lessonId);
    const data = {
        message: message,
        createdAt: Timestamp.now(),
    };

    try {
        await addDoc(messagesRef, data);
        console.log('created message ' + message);
        toast.success('Message sent!', {
            id: toastId,
        });
    } catch (error) {
        console.error(error);
        toast.error('error' + error, {
            id: toastId,
        });
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
