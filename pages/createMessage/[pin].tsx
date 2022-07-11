import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { db } from '../../firebase';
import { createMessage } from '../../service/lessonApi';
import { LessonType } from '../../types';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useForm } from 'react-hook-form';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

type FormData = {
    msg: string;
};

interface Props {
    msg: any;
}

const CreateMsg: React.FunctionComponent = () => {
    const router = useRouter();
    const pin = Array.isArray(router.query.pin)
        ? router.query.pin[0]
        : router.query.pin;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({ mode: 'onChange' });

    const onSubmit = handleSubmit(async (data) => {
        await sendMessage(data.msg);
        setValue('msg', '');
        console.log(data);
    });

    const [lesson, setLesson] = useState<LessonType | null>(null);
    const [loading, setLoading] = useState(true);

    const sendMessage = async (msg: string) => {
        // tee paremmin..
        // tsekataan onko vielä aktiivinen

        const { data, id } = await getLesson(parseInt(pin!));

        if (!data?.isActive) {
            console.log('no longer active');
            toast.error('This lesson is no longer active');
            if (lesson) setLesson({ ...lesson, isActive: false });
            return;
        }

        if (lesson) createMessage(lesson.id, msg);
    };

    const lessonsRef = collection(db, 'lessons');

    // Create a query against the collection.

    //console.log(typeof pin);

    const getLesson = async (code: number) => {
        const q = query(lessonsRef, where('pin', '==', code));

        console.log('pin: ' + code);
        const querySnapshot = await getDocs(q);
        console.log('lesson: ' + querySnapshot.docs[0]?.data());
        setLoading(false);
        return {
            data: querySnapshot.docs[0]?.data(),
            id: querySnapshot.docs[0]?.id,
        };
    };
    const getAndSetLesson = async (code: number) => {
        const { data, id } = await getLesson(code);
        if (data) {
            setLesson({
                name: data.name,
                pin: data.pin,
                id: id,
                isActive: data.isActive,
            });
        }
    };

    useEffect(() => {
        if (pin) {
            // Tee jotain paremmin tässä
            console.log('useeffect');
            getAndSetLesson(parseInt(pin));
        }
    }, [pin]);

    if (loading) {
        return <Loading />;
    }

    if (!lesson) {
        return (
            <NoLessonContainer>
                <h1>No active lesson found with this pin...</h1>
                <Button
                    variant='contained'
                    onClick={() => router.push(`/login`)}
                >
                    Back to login page
                </Button>
            </NoLessonContainer>
        );
    }
    return (
        <Container>
            <BoxContainer>
                <NimiContainer>
                    <h3>Tunnin nimi: {lesson.name} </h3>
                    {lesson.isActive ? (
                        <StatusBox>
                            <StatusText>status: aktiivinen</StatusText>
                            <CheckCircleIcon sx={{ color: '#4bd44b' }} />
                        </StatusBox>
                    ) : (
                        <StatusBox>
                            <StatusText>status: ei-aktiivinen</StatusText>
                            <DoDisturbIcon sx={{ color: '#bc0000' }} />{' '}
                        </StatusBox>
                    )}
                </NimiContainer>
                <JoinContainer>
                    <form onSubmit={onSubmit}>
                        <InputOma
                            id='outlined-basic'
                            label='Kysy jotain'
                            variant='filled'
                            {...register('msg', {
                                required: true,
                                maxLength: 50,
                            })}
                        />
                        <IconButton
                            type='submit'
                            disabled={!isDirty || !isValid || !lesson.isActive}
                        >
                            <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
                        </IconButton>

                        <ErrorP msg={errors.msg}>
                            Message is required and max length is xx
                        </ErrorP>
                    </form>
                </JoinContainer>
                <Button onClick={() => router.push(`/login`)}>
                    To login page
                </Button>
            </BoxContainer>
        </Container>
    );
};

export default CreateMsg;

const ErrorP = styled.p<Props>`
    color: red;
    visibility: ${(props) => (!!props.msg ? 'inline' : 'hidden')};
`;
const StatusText = styled.div`
    padding-right: 15px;
`;

const StatusBox = styled.div`
    color: #989898;
    font-size: small;
    display: flex;
    align-items: center;
    padding: 5px 10px 15px 0px;
`;

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const NoLessonContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
`;

const BoxContainer = styled.div`
    background-color: #ededed;
    padding: 25px;
`;

const NimiContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const JoinContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputOma = styled(TextField)`
    //background-color: white;
`;
