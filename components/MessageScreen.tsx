import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

interface IMessageScreenProps {
    id: any;
}

const MessageScreen: React.FunctionComponent<IMessageScreenProps> = ({
    id,
}) => {
    const messageQuery = query(collection(db, `lessons/${id}/messages`));

    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(messageQuery, (snap) => {
            snap.docs.map((doc) => console.log(doc.data()));
            console.log('Täällä ollaan');
            setMessages(snap.docs.map((doc) => doc.data().message));
        });

        return () => {
            console.log('Nyt täällä');
            setMessages([]);
            unsubscribe();
        };
    }, [id]);

    const messagesDiv = messages.map((msg) => <div>{msg}</div>);
    return <div>{messagesDiv}</div>;
};

export default MessageScreen;
