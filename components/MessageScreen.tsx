import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';
import styled from 'styled-components';

interface IMessageScreenProps {
    id: any;
}

type Message = {
    id: string;
    message: string;
    date: string;
};

const MessageScreen: React.FunctionComponent<IMessageScreenProps> = ({
    id,
}) => {
    const messageQuery = query(
        collection(db, `lessons/${id}/messages`),
        orderBy('createdAt')
    );
    const endOfMessageRef = useRef<null | HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const scrollToBottom = () => {
        if (endOfMessageRef?.current) {
            endOfMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(messageQuery, (snap) => {
            snap.docs.map((doc) => console.log(doc.data().createdAt.toDate()));

            setMessages(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    message: doc.data().message,
                    date: doc.data().createdAt.toDate().toLocaleString(),
                }))
            );
            scrollToBottom();
        });

        return () => {
            console.log('Nyt täällä');
            setMessages([]);
            unsubscribe();
        };
    }, [id]);

    const messagesDiv = messages.map((msg) => (
        <Message
            date={msg.date}
            message={msg.message}
            id={msg.id}
            key={msg.id}
        />
    ));

    return (
        <Container>
            {messagesDiv} <EndOfMessage ref={endOfMessageRef} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    padding: 15px;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

export default MessageScreen;
