import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
    return (
        <Spinner animation="border" role="status" style={{ color: `var(--cyan)` }}></Spinner>
    );
};

export default Loading;
