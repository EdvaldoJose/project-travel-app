import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TravelOptions from '../components/TravelOptions';
import ErrorMessage from '../components/ErrorMessage';

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: { rating: number; comment: string };
  value: number;
  rate?: number; // Adicionado para simular o cálculo do valor
}

const OptionsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { options, origin, destination } = location.state || {};
  const [error, setError] = React.useState<string>('');

  const handleChooseDriver = async (driver: Driver) => {
    try {
      const distance = driver.value / (driver.rate || 1.5); //Usando Fallback para rate
      const response = await fetch('/ride/confirm', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: 'user-id', // Ajuste conforme necessário
          origin,
          destination,
          distance, // driver.value / driver.rate, // Simulando cálculo da distância Usando  a linha 25 (A segunda solução remove completamente a variável desnecessária, simplificando o código.)
          duration: '20 mins', // Ajuste conforme necessário
          driver: { id: driver.id, name: driver.name },
          value: driver.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      navigate('/history');
    } catch (err: any) {
      setError(err.message || 'Unexpected error occurred');
    }
  };

  if (!options) {
    return <ErrorMessage message="No options available. Please go back and try again." />;
  }

  return (
    <div>
      <h1>Travel Options</h1>
      <TravelOptions options={options} onChoose={handleChooseDriver} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default OptionsPage;
