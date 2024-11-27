import React, { useState } from 'react';
import TravelForm from '../components/TravelForm';
import TravelOptions from '../components/TravelOptions';
import ErrorMessage from '../components/ErrorMessage';

const RequestPage: React.FC = () => {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');

    return (
        <div>
            <h1>Request a Ride</h1>
            <TravelForm onSubmit={setOptions} onError={setError} />
            {error && <ErrorMessage message={error} />}
            {options.length > 0 && <TravelOptions options={options} onChoose={(driver) => console.log(driver)} />}
        </div>
    );
};

export default RequestPage;
