import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Advisor from './pages/Advisor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/advisor" element={<Advisor />} />
      </Routes>
    </Router>
  );
}

export default App;