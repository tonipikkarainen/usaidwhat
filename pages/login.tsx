import { useState, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button, IconButton, TextField } from '@mui/material';
import { provider, auth } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Head from 'next/head';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useRouter } from 'next/router';

import { useAuthState } from 'react-firebase-hooks/auth';

interface ILoginProps {}

const Login: FunctionComponent<ILoginProps> = (props) => {
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const router = useRouter();
    const [user] = useAuthState(auth);

    const enterLesson = () => {
        router.push(`/createMessage/${input}`);
        //setIsSending(true);
    };

    const signIn = () => {
        signInWithPopup(auth, provider).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
    };

    if (user) {
        router.push(`/`);
        //return <Home />;
    }

    return (
        <Container>
            <Head>
                <title>Login screen</title>
            </Head>

            <LoginContainer>
                <SignIn>
                    <h1>Please sign in with Google</h1>
                    <LogButton variant='contained' onClick={signIn}>
                        Sign in
                    </LogButton>
                </SignIn>
                <h2>Or join to an existing lesson:</h2>
                <JoinContainer>
                    <InputOma
                        id='outlined-basic'
                        label='Join to lesson'
                        variant='filled'
                        onChange={(event) => setInput(event.target.value)}
                    />
                    <IconButton
                        onClick={enterLesson}
                        disabled={input.length === 0}
                    >
                        <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
                    </IconButton>
                </JoinContainer>
            </LoginContainer>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
`;

const JoinContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SignIn = styled.div`
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LogButton = styled(Button)`
    width: 100px;
`;

const LoginContainer = styled.div`
    background-color: whitesmoke;
    border-radius: 5px;
    padding: 35px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const InputOma = styled(TextField)`
    //background-color: white;
`;
