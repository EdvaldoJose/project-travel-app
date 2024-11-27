import React from 'react';

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string };
  value: number; // Certifique-se de que esta propriedade seja sempre um número
}

interface TravelHistoryProps {
  history: Ride[];
}

const TravelHistory: React.FC<TravelHistoryProps> = ({ history }) => (
  <div>
    <h2>Travel History</h2>
    {history.map((ride) => (
      <div key={ride.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <p>Date: {ride.date}</p>
        <p>Origin: {ride.origin}</p>
        <p>Destination: {ride.destination}</p>
        <p>Distance: {ride.distance} km</p>
        <p>Duration: {ride.duration}</p>
        <p>Driver: {ride.driver.name}</p>
        <p>
          Cost: ${typeof ride.value === 'number' ? ride.value.toFixed(2) : 'N/A'}
        </p>
      </div>
    ))}
  </div>
);

export default TravelHistory;







// import React from 'react';

// interface Ride {
//   id: number;
//   date: string;
//   origin: string;
//   destination: string;
//   distance: number;
//   duration: string;
//   driver: { id: number; name: string };
//   value: number;
// }

// interface TravelHistoryProps {
//   history: Ride[];
// }

// const TravelHistory: React.FC<TravelHistoryProps> = ({ history }) => (
//   <div>
//     <h2>Travel History</h2>
//     {history.map((ride) => (
//       <div key={ride.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//         <p>Date: {ride.date}</p>
//         <p>Origin: {ride.origin}</p>
//         <p>Destination: {ride.destination}</p>
//         <p>Distance: {ride.distance} km</p>
//         <p>Duration: {ride.duration}</p>
//         <p>Driver: {ride.driver.name}</p>
//         <p>Cost: ${ride.value.toFixed(2)}</p>
//       </div>
//     ))}
//   </div>
// );

// export default TravelHistory;
