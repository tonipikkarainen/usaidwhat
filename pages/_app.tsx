import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '../components/Loading';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Loading />;

    //if (!user) return <Login />;
    return (
        <div>
            <Toaster />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
