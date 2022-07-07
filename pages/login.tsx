import styled from 'styled-components';
import { Button, IconButton, TextField } from '@mui/material';
import { provider, auth } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Head from 'next/head';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';

type FormData = {
    lessonpin: number;
};

const Login: React.FC = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<FormData>({ mode: 'onChange' });
    const router = useRouter();
    const [user] = useAuthState(auth);

    const onSubmit = handleSubmit((data) => {
        router.push(`/createMessage/${data.lessonpin}`);
    });

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
                    <form onSubmit={onSubmit}>
                        <InputOma
                            id='outlined-basic'
                            label='Join to lesson'
                            variant='filled'
                            type='number'
                            {...register('lessonpin', {
                                required: true,
                                valueAsNumber: true,
                            })}
                        />
                        <IconButton
                            type='submit'
                            disabled={!isDirty || !isValid}
                        >
                            <ArrowCircleRightIcon fontSize='large'></ArrowCircleRightIcon>
                        </IconButton>
                        {errors.lessonpin && (
                            <ErrorP>
                                Pin has to be number and is required
                            </ErrorP>
                        )}
                    </form>
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

const ErrorP = styled.p`
    color: red;
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
