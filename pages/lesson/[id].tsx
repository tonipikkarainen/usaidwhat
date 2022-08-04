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
    background-color: #e3bebe;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const BodyCont = styled.div`
    display: flex;
    flex: 1 1 auto;
`;

const MessageCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 3;
    flex-direction: column;
    min-height: min-content;
`;

const SideBarCont = styled.div`
    flex: 1;
`;
