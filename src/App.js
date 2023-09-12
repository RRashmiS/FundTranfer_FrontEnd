import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes from react-router-dom
import LandingPage from './component/landingPage';
import TransferPage from './component/transfer';
import Header from './component/header';
function App() {
  return (
    <Router>
       <Header/>
      <Routes>
       
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/transfer" element={<TransferPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
