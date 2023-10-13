import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import FormInput from '../src/website/input';
import Db from '../src/website/db';
import DbPeg from '../src/website/dbpeg';
import Print from '../src/website/print';
import Database from './website/database';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/forminput" element={<FormInput/>} />  
         <Route path="/db" element={<Db/>} />
         <Route path="/dbpeg" element={<DbPeg/>} />
         <Route path="/print" element={<Print/>} />
         <Route path="/database" element={<Database/>} />
      </Routes>
    </Router>
  );
}

export default App;