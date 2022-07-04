import { useEffect, useState } from 'react';

import styled from 'styled-components';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LessonType } from '../types';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Button, IconButton, TextField } from '@mui/material';
import { createMessage } from '../service/lessonApi';

interface ICreateMessageProps {
    pin: number;
}

const CreateMessage: React.FunctionComponent<ICreateMessageProps> = ({
    pin,
}) => {
    const [lesson, setLesson] = useState<LessonType | null>(null);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (lesson?.isActive) {
            console.log(lesson.id);
            createMessage(lesson.id, input);
        }
    };

    const lessonsRef = collection(db, 'lessons');

    // Create a query against the collection.
    const q = pin
        ? query(lessonsRef, where('pin', '==', pin))
        : query(lessonsRef, where('pin', '==', 1234));
    console.log(typeof pin);

    const getLesson = async () => {
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs[0]?.data());
        setLesson({
            name: querySnapshot.docs[0]?.data().name,
            pin: querySnapshot.docs[0]?.data().pin,
            id: querySnapshot.docs[0]?.id,
            isActive: querySnapshot.docs[0]?.data().isActive,
        });
    };

    useEffect(() => {
        if (pin) {
            getLesson();
        }
    }, []);

    if (!lesson) {
        return <div>No lesson found</div>;
    }
    return (
        <Container>
            <NimiContainer>Tunnin nimi: {lesson.name}</NimiContainer>
            <JoinContainer>
                <InputOma
                    id='outlined-basic'
                    label='Kysy jotain'
                    variant='filled'
                    onChange={(event) => setInput(event.target.value)}
                />
                <IconButton onClick={sendMessage} disabled={input.length === 0}>
                    <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
                </IconButton>
            </JoinContainer>
        </Container>
    );
};

export default CreateMessage;

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const NimiContainer = styled.p`
    display: flex;
`;

const JoinContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputOma = styled(TextField)`
    //background-color: white;
`;
