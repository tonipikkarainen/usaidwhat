import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

function Loading() {
    return (
        <Container>
            <h1>Loading...</h1>
            <CircularProgress />
        </Container>
    );
}

export default Loading;

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
    flex-direction: column;
`;
