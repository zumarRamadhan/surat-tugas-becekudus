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

import FormInputPPK from "./website/ppk/input";
import DbPPK from "./website/ppk/db";
import DbPegPPK from "./website/ppk/dbpeg";
import PrintPPK from "./website/ppk/print";
import DatabasePPK from "./website/ppk/database";
import EditSTPPK from "./website/ppk/editsurattugas";
function App() {
  const redirectToDbPeg = () => {
    return <Navigate to="/dbpeg" />;
  };

  const redirectToDbPegPPK = () => {
    return <Navigate to="/ppk/dbpeg" />;
  };

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} /> {/* not found */}
        <Route
          path="/"
          element={
            token && role ? (
              // Jika token dan role sudah ada, redirect ke halaman yang sesuai
              role === "master" ? (
                <Navigate to="/db" />
              ) : role === "ppk" ? (
                <Navigate to="/ppk/db" />
              ) : (
                <Login />
              )
            ) : (
              // Jika token dan role belum ada, tampilkan halaman Login
              <Login />
            )
          }
        />
        <Route
          path="/login"
          element={
            token && role ? (
              // Jika token dan role sudah ada, redirect ke halaman yang sesuai
              role === "master" ? (
                <Navigate to="/db" />
              ) : role === "ppk" ? (
                <Navigate to="/ppk/db" />
              ) : (
                <Login />
              )
            ) : (
              // Jika token dan role belum ada, tampilkan halaman Login
              <Login />
            )
          }
        />
        <Route path="/forminput" element={<FormInput />} />
        <Route
          path="/db"
          element={token && role ? <Db /> : <Navigate to="/login" />}
        />
        <Route
          path="/dbpeg"
          element={token && role ? <DbPeg /> : <Navigate to="/login" />}
        />
        <Route
          path="/print"
          element={token && role ? <Print /> : <Navigate to="/login" />}
        />
        <Route
          path="/print/:valueInput"
          element={token && role ? <Print /> : <Navigate to="/login" />}
        />
        <Route
          path="/database"
          element={token && role ? <Database /> : <Navigate to="/login" />}
        />
        <Route
          path="/addpegawai"
          element={token && role ? <AddPegawai /> : <Navigate to="/login" />}
        />
        <Route
          path="/editpegawai/1"
          element={
            <>
              {window.location.pathname === "/editpegawai/1" &&
                redirectToDbPeg()}
            </>
          }
        />
        <Route
          path="/editpegawai/:id"
          element={token && role ? <EditPegawai /> : <Navigate to="/login" />}
        />
        <Route
          path="/editsurattugas/:id"
          element={token && role ? <EditST /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/forminput"
          element={token && role ? <FormInputPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/db"
          element={token && role ? <DbPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/dbpeg"
          element={token && role ? <DbPegPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/print"
          element={token && role ? <PrintPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/print/:valueInput"
          element={token && role ? <PrintPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/database"
          element={token && role ? <DatabasePPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/editsurattugas/:id"
          element={token && role ? <EditSTPPK /> : <Navigate to="/login" />}
        />
        <Route
          path="/ppk/editpegawai/1"
          element={
            <>
              {window.location.pathname === "/ppk/editpegawai/1" &&
                redirectToDbPegPPK()}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
