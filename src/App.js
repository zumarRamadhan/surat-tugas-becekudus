import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import FormInput from "./website/input";
import Db from "./website/db";
import DbPeg from "./website/dbpeg";
import Print from "./website/print";
import Database from "./website/database";
import Login from "./website/login";
import AddPegawai from "./website/addpegawai";
import EditPegawai from "./website/editpegawai";
import EditST from "./website/editsurattugas";

function App() {
  const redirectToDbPeg = () => {
    return <Navigate to="/dbpeg" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forminput" element={<FormInput />} />
        <Route path="/db" element={<Db />} />
        <Route path="/dbpeg" element={<DbPeg />} />
        <Route path="/print" element={<Print />} />
        <Route path="/print/:id" element={<Print />} />
        <Route path="/database" element={<Database />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addpegawai" element={<AddPegawai />} />
        <Route
          path="/editpegawai/1"
          element={
            <>
              {window.location.pathname === "/editpegawai/1" &&
                redirectToDbPeg()}
            </>
          }
        />
        <Route path="/editpegawai/:id" element={<EditPegawai />} />
        <Route path="/editsurattugas/:id" element={<EditST />} />
      </Routes>
    </Router>
  );
}

export default App;
