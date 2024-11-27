import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div style={{ color: 'red', marginTop: '10px' }}>
        <strong>Error:</strong> {message}
        </div>
);

export default ErrorMessage;