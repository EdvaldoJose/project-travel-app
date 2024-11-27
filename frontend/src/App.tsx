import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestPage from './pages/RequestPage';
import OptionsPage from './pages/OptionsPage';
import HistoryPage from './pages/HistoryPage';
// import logo from './logo.svg';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RequestPage />} />
      <Route path="/options" element={<OptionsPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  </Router>
)

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
