import React, { useState, useEffect, useCallback } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import TravelHistory from '../components/TravelHistory';

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number;
}

const HistoryPage: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [driverId, setDriverId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchHistory = useCallback(async () => {
    try {
      const query = driverId ? `?driver_id=${driverId}` : '';
      const response = await fetch(`/ride/${userId}${query}`);
      if (!response.ok) {
        throw new Error('No rides found');
      }

      const data = await response.json();
      setRides(data.rides);
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred');
    }
  }, [userId, driverId]); // Agora, `userId` e `deiverId` sao dependecias do useCallback

  useEffect(() => {
    if (userId) {
      fetchHistory();
    }
  }, [userId, driverId, fetchHistory]); // `fetchHistory` incluindo como dependencia do useEffect

  return (
    <div>
      <h1>Travel History</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Driver ID (optional)"
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
      />
      <button onClick={fetchHistory}>Apply Filter</button>
      {error && <ErrorMessage message={error} />}
      {rides.length > 0 && <TravelHistory history={rides} />}
    </div>
  );
};

export default HistoryPage;
