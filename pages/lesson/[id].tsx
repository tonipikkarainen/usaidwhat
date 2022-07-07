import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Header from '../../components/Header';
import MessageScreen from '../../components/MessageScreen';
import Sidebar from '../../components/Sidebar';
import { auth, db } from '../../firebase';
import Login from '../login';

interface ILessonContentProps {}

const LessonContent: React.FunctionComponent<ILessonContentProps> = (props) => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const id = Array.isArray(router.query.id)
        ? router.query.id[0]
        : router.query.id;
    console.log(id);

    if (!user) return <Login />;
    return (
        <Container>
            <Header />
            <BodyCont>
                <SideBarCont>
                    <Sidebar />
                </SideBarCont>
                <MessageCont>
                    <MessageScreen id={id} />
                </MessageCont>
            </BodyCont>
        </Container>
    );
};

export default LessonContent;

const Container = styled.div`
    height: 100vh;
    background-color: white;
`;

const BodyCont = styled.div`
    display: flex;
    height: 100%;
`;

const MessageCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 3;
    flex-direction: column;
`;

const SideBarCont = styled.div`
    flex: 1;
`;
