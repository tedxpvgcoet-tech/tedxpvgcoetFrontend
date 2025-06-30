import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from '../src/components/Events';
import Punaruthan from '../src/components/Punaruthan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/punaruthan" element={<Punaruthan />} />
      </Routes>
    </Router>
  );
}

export default App;