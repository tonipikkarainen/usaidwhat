import styled from 'styled-components';

interface IMessageProps {
    id: string;
    message: string;
    date: string;
}

const Message: React.FunctionComponent<IMessageProps> = ({
    id,
    message,
    date,
}) => {
    return <Container>{message}</Container>;
};

export default Message;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    background-color: #dfe2e4;
    padding: 15px;
    margin-top: 1px;
    border-radius: 15px;
`;
