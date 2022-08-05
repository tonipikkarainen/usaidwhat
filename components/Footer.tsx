import { Button, IconButton, TextField } from '@mui/material';
import { auth } from '../firebase';
import { useState } from 'react';
import { createLesson } from '../service/lessonApi';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface HeaderProps {}

const Footer: React.FunctionComponent<HeaderProps> = (props) => {
    return <Container></Container>;
};

export default Footer;

const Container = styled.div`
    padding: 15px;
    position: sticky;
    bottom: 0;
    z-index: 3;
    flex: 1;
    background-color: whitesmoke;
`;
