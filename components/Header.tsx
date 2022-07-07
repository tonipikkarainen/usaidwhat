import { Button, IconButton, TextField } from '@mui/material';
import { auth } from '../firebase';
import { useState } from 'react';
import { createLesson } from '../service/lessonApi';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const [input, setInput] = useState('');
    const router = useRouter();
    const logOut = async () => {
        if (auth.currentUser) {
            await auth.signOut();
            router.push(`/`);
        }
    };

    const create = async () => {
        if (auth?.currentUser) {
            await createLesson(auth.currentUser.uid, input);
            setInput('');
            return;
        }
        console.log('No user');
    };

    return (
        <Container>
            <Button onClick={logOut}>LogOut</Button>
            <TextField
                id='outlined-basic'
                label='Create lesson'
                variant='filled'
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
            <IconButton onClick={create} disabled={input.length === 0}>
                <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
            </IconButton>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 3px solid whitesmoke;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;
`;
