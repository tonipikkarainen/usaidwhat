import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

interface ILessonContentProps {}

const LessonContent: React.FunctionComponent<ILessonContentProps> = (props) => {
    return (
        <Container>
            <Header />
            <BodyCont>
                <SideBarCont>
                    <Sidebar />
                </SideBarCont>
                <MessageCont>Here are messages</MessageCont>
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
`;

const SideBarCont = styled.div`
    flex: 1;
`;
