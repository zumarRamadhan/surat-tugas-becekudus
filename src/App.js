import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import FormInput from '../src/website/input';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/forminput" element={<FormInput/>} />  
      </Routes>
    </Router>
  );
}

export default App;