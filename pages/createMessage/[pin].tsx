import { Button, IconButton, TextField } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { db } from '../../firebase';
import { createMessage } from '../../service/lessonApi';
import { LessonType } from '../../types';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CreateMsg: React.FunctionComponent = () => {
    const router = useRouter();
    const pin = Array.isArray(router.query.pin)
        ? router.query.pin[0]
        : router.query.pin;
    console.log(pin);

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

    console.log(typeof pin);

    const getLesson = async (code: number) => {
        const q = query(lessonsRef, where('pin', '==', code));

        console.log('pin: ' + code);
        const querySnapshot = await getDocs(q);
        console.log('lesson: ' + querySnapshot.docs[0]?.data());
        if (querySnapshot.docs[0]?.data()) {
            setLesson({
                name: querySnapshot.docs[0]?.data().name,
                pin: querySnapshot.docs[0]?.data().pin,
                id: querySnapshot.docs[0]?.id,
                isActive: querySnapshot.docs[0]?.data().isActive,
            });
        }
    };

    useEffect(() => {
        if (pin) {
            // Tee jotain paremmin tässä
            getLesson(parseInt(pin));
            console.log('useeffect');
        }
    }, []);

    if (!lesson || lesson == undefined) {
        return (
            <div>
                No lesson found
                <Button onClick={() => router.push(`/login`)}>
                    To login page
                </Button>
            </div>
        );
    }
    return (
        <Container>
            <NimiContainer>Tunnin nimi: {lesson.name}</NimiContainer>
            <JoinContainer>
                <InputOma
                    id='outlined-basic'
                    label='Kysy jotain'
                    variant='filled'
                    onChange={(event: any) => setInput(event.target.value)}
                />
                <IconButton onClick={sendMessage} disabled={input.length === 0}>
                    <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
                </IconButton>
            </JoinContainer>
            <Button onClick={() => router.push(`/login`)}>To login page</Button>
        </Container>
    );
};

export default CreateMsg;

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
