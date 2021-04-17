import React from 'react';
import { Alert } from 'react-bootstrap';

export const Message = ({ message }) => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Oops!</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    );
};

export default Message;
