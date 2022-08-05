import { useRouter } from 'next/router';
import styled from 'styled-components';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { IconButton } from '@mui/material';
import { auth } from '../firebase';
import { setIsActive } from '../service/lessonApi';

interface ILessonProps {
    name: string;
    pin: number;
    id: string;
    isActive: boolean;
}

const Lesson: React.FunctionComponent<ILessonProps> = ({
    name,
    pin,
    id,
    isActive,
}) => {
    const router = useRouter();

    const enterLesson = () => {
        router.push(`/lesson/${id}`);
    };

    const changeActiveState = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        console.log('isactive: ' + isActive);
        if (auth?.currentUser) {
            await setIsActive(id, !isActive);
            return;
        }
        //console.log('No user');
    };

    return (
        <Container onClick={enterLesson}>
            <Name>{name}</Name>
            <Pin>{pin}</Pin>
            {isActive ? (
                <IconButton onClick={(e) => changeActiveState(e)}>
                    <ToggOn />
                </IconButton>
            ) : (
                <IconButton onClick={(e) => changeActiveState(e)}>
                    <ToggOff />
                </IconButton>
            )}
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

const ToggOn = styled(ToggleOnIcon)`
    //background-color: white;
    color: #02cb02;
`;

const ToggOff = styled(ToggleOffIcon)`
    //background-color: white;
    color: #ca0808;
`;

const Pin = styled.div`
    flex: 1;
`;
