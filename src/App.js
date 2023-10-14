import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FormInput from "./website/input";
import Db from "./website/db";
import DbPeg from "./website/dbpeg";
import Print from "./website/print";
import Database from "./website/database";
import Login from "./website/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/forminput" element={<FormInput />} />
        <Route path="/db" element={<Db />} />
        <Route path="/dbpeg" element={<DbPeg />} />
        <Route path="/print" element={<Print />} />
        <Route path="/database" element={<Database />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
