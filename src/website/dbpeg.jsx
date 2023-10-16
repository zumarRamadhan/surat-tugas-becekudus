import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/dbpeg.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";

function DbPeg() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  const [pegawaiData, setPegawaiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiurl}employee/data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((result) => {
        console.log("data API", result.data);
        const responseAPI = result.data;

        setPegawaiData(responseAPI.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("terjadi kesalahan: ", err);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // showPopupLoading();
    axios
      .delete(`${apiurl}employee/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((response) => {
        // Penanganan ketika penghapusan berhasil
        console.log("Data berhasil dihapus");
        // closeDeletePopup();
        // showSuccessDelete();
        // closePopupLoading();
      })
      .catch((error) => {
        // Penanganan ketika terjadi kesalahan saat menghapus data
        console.log("Terjadi kesalahan saat menghapus data:", error);
        // showFailedDelete();
        // closeDeletePopup();
        // closePopupLoading();
      });
  };

  

  if (pegawaiData && !isError)
    return (
      <div>
        <header>
          <div className="logo">
            <img src={LogoAPKB} />
          </div>
          <ul className="navbar">
            <li onClick={() => navigate("/forminput")}>
              <a href="">INPUT</a>
            </li>
            <li onClick={() => navigate("/db")}>
              <a href="">DB</a>
            </li>
            <li onClick={() => navigate("/database")}>
              <a href="">DATABASE</a>
            </li>
            <li onClick={() => navigate("/print")}>
              <a href="">PRINT</a>
            </li>
            <li className="active">
              <a href="">DBPEG</a>
            </li>
          </ul>
        </header>

        <div className="table-container">
          <div className="header-table">
            <div className="search">
              <input type="text" placeholder="Pencarian" />
              <div className="icon-search">
                <Icon icon="icomoon-free:search" width="15" />
                {/* <iconify-icon
                icon="icomoon-free:search"
                width="15"
              ></iconify-icon> */}
              </div>
            </div>
            <button className="import exel">Export Excel</button>
            <button
              className="tambah-data"
              onClick={() => navigate("/addpegawai")}
            >
              Tambah Data
            </button>
          </div>
          <table>
            <tr>
              <th id="id">NAMA</th>
              <th id="eselon">NIP</th>
              <th id="dpt">PANGKAT</th>
              <th id="nost">GOL/RUANG</th>
              <th id="datest">JABATAN</th>
              <th id="aksi">AKSI</th>
            </tr>
            {Array.isArray(pegawaiData) ? (
              pegawaiData.map((data, index) => (
                <tr key={index}>
                  <td id="id">{data.name}</td>
                  <td id="eselon">{data.emp_id}</td>
                  <td id="dpt">{data.rank}</td>
                  <td id="nost">{data.gol_room}</td>
                  <td id="datest">{data.position}</td>
                  <td id="action-db">
                    <div className="action-db">
                      <button
                        className="edit"
                        onClick={() => navigate(`/editpegawai/${data.id}`)}
                      >
                        <Icon icon="fluent:edit-16-regular" width="20" />
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(data.id)}
                      >
                        <Icon icon="fluent:delete-16-regular" width="20" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colspan="6">Loading data...</td>
              </tr>
            )}
          </table>
        </div>
      </div>
    );
}

export default DbPeg;
