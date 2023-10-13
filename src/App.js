import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import FormInput from '../src/website/input';
import Db from '../src/website/db';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/forminput" element={<FormInput/>} />  
         <Route path="/db" element={<Db/>} />
      </Routes>
    </Router>
  );
}

export default App;