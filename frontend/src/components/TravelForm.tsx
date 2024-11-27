import React, { useState } from 'react';
import axios from 'axios';

interface TravelFormProps {
  onSubmit: (data: any) => void;
  onError: (error: string) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, onError }) => {
  const [userId, setUserId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/ride/estimate', { customer_id: userId, origin, destination });
      onSubmit(response.data);
    } catch (error: any) {
      onError(error.response?.data?.error_description || 'Unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <button type="submit">Estimate Travel</button>
    </form>
  );
};

export default TravelForm;
