import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Lesson from './Lesson';
import styled from 'styled-components';
import { LessonType } from '../types';

const Sidebar = () => {
    const [lessons, setLessons] = useState<LessonType[]>([]);
    const lessonsQuery = query(
        collection(db, 'lessons'),
        where('ownerId', '==', auth?.currentUser?.uid)
    );

    // Listening to all the lessons
    // Maybe should listen only messages
    useEffect(() => {
        const unsubscribe = onSnapshot(lessonsQuery, (snap) => {
            snap.docs.map((doc) => console.log(doc.data()));
            const data = snap.docs.map((doc) => ({
                name: doc.data().name,
                pin: doc.data().pin,
                id: doc.id,
                isActive: doc.data().isActive,
            }));
            console.log(data);
            setLessons(data);
        });

        return () => unsubscribe();
    }, []);

    const lessonsDiv = lessons.map((lesson) => (
        <Lesson
            key={lesson.id}
            name={lesson.name}
            pin={lesson.pin}
            id={lesson.id}
            isActive={lesson.isActive}
        />
    ));

    return <Container>{lessonsDiv}</Container>;
};

export default Sidebar;

const Container = styled.div`
    background-color: white;

    border-right: 5px whitesmoke solid;
`;
