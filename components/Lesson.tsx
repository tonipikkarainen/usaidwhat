import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface ILessonProps {
    name: string;
    pin: number;
    id: string;
}

const Lesson: React.FunctionComponent<ILessonProps> = ({ name, pin, id }) => {
    const router = useRouter();

    const enterLesson = () => {
        router.push(`/lesson/${id}`);
    };
    return (
        <Container onClick={enterLesson}>
            <Name>{name}</Name>
            <Pin>{pin}</Pin>
        </Container>
    );
};

export default Lesson;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid white;
    background-color: whitesmoke;
    cursor: pointer;
    &:hover {
        background-color: lightgray;
    }
`;

const Name = styled.div`
    flex: 1;
`;

const Pin = styled.div`
    flex: 1;
`;
