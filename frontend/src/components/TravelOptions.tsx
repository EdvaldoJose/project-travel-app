import React from 'react';

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string };
  value: number;
  rate: number; // Adicionado para simular o cálculo do valor
}

interface TravelOptionsProps {
  options: Driver[];
  onChoose: (driver: Driver) => void;
}

const TravelOptions: React.FC<TravelOptionsProps> = ({ options, onChoose }) => (
  <div>
    <h2>Available Travel Options</h2>
    {options.map((driver) => (
      <div key={driver.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>{driver.name}</h3>
        <p>{driver.description}</p>
        <p>Vehicle: {driver.vehicle}</p>
        <p>Rating: {driver.review.rating}/5 - {driver.review.comment}</p>
        <p>Cost: ${driver.value.toFixed(2)}</p>
        <button onClick={() => onChoose(driver)}>Choose</button>
      </div>
    ))}
  </div>
);

export default TravelOptions;
