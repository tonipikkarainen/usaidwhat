import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import Footer from '../../components/Footer';
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
    console.log('id:' + id);

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
            <Footer />
        </Container>
    );
};

export default LessonContent;

const Container = styled.div`
    background-color: #dedede;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const BodyCont = styled.div`
    display: flex;
    flex: 14;
    overflow-y: scroll;
`;

const MessageCont = styled.div`
    flex: 4;

    background-color: aliceblue;
    overflow-y: scroll;
`;

const SideBarCont = styled.div`
    flex: 1;
    overflow-y: scroll;
`;
