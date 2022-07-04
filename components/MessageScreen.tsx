import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

interface IMessageScreenProps {
    id: any;
}

type Message = {
    id: string;
    message: string;
};

const MessageScreen: React.FunctionComponent<IMessageScreenProps> = ({
    id,
}) => {
    const messageQuery = query(collection(db, `lessons/${id}/messages`));

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(messageQuery, (snap) => {
            snap.docs.map((doc) => console.log(doc.data()));
            console.log('Täällä ollaan');
            setMessages(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    message: doc.data().message,
                }))
            );
        });

        return () => {
            console.log('Nyt täällä');
            setMessages([]);
            unsubscribe();
        };
    }, [id]);

    const messagesDiv = messages.map((msg) => (
        <div key={msg.id}>{msg.message}</div>
    ));
    return <div>{messagesDiv}</div>;
};

export default MessageScreen;
