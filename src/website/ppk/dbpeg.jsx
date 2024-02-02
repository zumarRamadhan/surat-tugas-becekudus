import { useState, useEffect } from "react";
import LogoAPKB from "../../Assets/LOGOAPKB.png";
import "../../Style/dbpeg.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../../Assets/gif-success.gif";
import GifFailed from "../../Assets/gif-failed.gif";
import GifDelate from "../../Assets/gif-delete.gif";
import ExportExcelButton from "../../Component/exportfile";
import ImgLogout from "../../Assets/68582-log-out.gif";
function DbPeg() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");
  const [dataExport, setDataExport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "ppk") {
      navigate("/dbpeg");
    }
  }, []);

  const showSuccessDelete = () => {
    const background = document.querySelector("#popup-success");
    background.style.display = "flex";
    const popupSuccessDelete = document.querySelector(".detail-success");
    popupSuccessDelete.style.display = "grid";
    popupSuccessDelete.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccessDelete = () => {
    const background = document.querySelector("#popup-success");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const popupSuccessDelete = document.querySelector(".detail-success");
    setTimeout(() => (popupSuccessDelete.style.display = "none"), 250);
    popupSuccessDelete.style.animation = "slide-up 0.3s ease-in-out";
    // refresh
    window.location.reload();
  };

  const showRelog = () => {
    const background = document.querySelector("#Relog");
    background.style.display = "flex";
    const popUpLogin = document.querySelector(".detail-Relog");
    popUpLogin.style.display = "grid";
    popUpLogin.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeRelog = () => {
    const background = document.querySelector("#Relog");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpLogin = document.querySelector(".detail-Relog");
    setTimeout(() => (popUpLogin.style.display = "none"), 250);
    popUpLogin.style.animation = "slide-up 0.3s ease-in-out";
    navigate(`/login`);
  };

  const showFailedDelete = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popupFailedDelete = document.querySelector(".detail-Failed");
    popupFailedDelete.style.display = "grid";
    popupFailedDelete.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailedDelete = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupFailedDelete = document.querySelector(".detail-Failed");
    setTimeout(() => (popupFailedDelete.style.display = "none"), 250);
    popupFailedDelete.style.animation = "slide-up 0.3s ease-in-out";
  };

  const showPopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    background.style.display = "flex";
    const PopupLoading = document.querySelector(".body-loading");
    PopupLoading.style.display = "grid";
    PopupLoading.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closePopupLoading = () => {
    const background = document.querySelector(".popup-loading");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const PopupLoading = document.querySelector(".body-loading");
    setTimeout(() => (PopupLoading.style.display = "none"), 250);
    PopupLoading.style.animation = "slide-up 0.3s ease-in-out";
  };

  const [pegawaiData, setPegawaiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    showPopupLoading();
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
        setDataExport(responseAPI.data);
        setPegawaiData(responseAPI.data);
        setIsLoading(false);
        closePopupLoading();
      })
      .catch((err) => {
        console.log("terjadi kesalahan: ", err);
        if (err.response && err.response.status === 401) {
          showRelog();
        } else {
          setIsLoading(false);
          closePopupLoading();
          setIsError(true);
        }

        closePopupLoading();
      });
  }, []);

  // search

  // Filter data based on the search term
  const filteredPegawaiData = pegawaiData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.emp_id.toString().includes(searchTerm) ||
      data.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.gol_room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showLogout = () => {
    const background = document.querySelector("#popup-logout");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-logout");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeLogout = () => {
    const background = document.querySelector("#popup-logout");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-logout");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (pegawaiData && !isError)
    return (
      <div>
        <div
          className="logout"
          onClick={() => {
            showLogout();
          }}
        >
          <p>Keluar</p>
        </div>
        <header>
          <div className="logo">
            <img src={LogoAPKB} />
          </div>
          <ul className="navbar">
            <li onClick={() => navigate("/ppk/forminput")}>
              <a href="">INPUT</a>
            </li>
            <li onClick={() => navigate("/ppk/db")}>
              <a href="">DB</a>
            </li>
            <li onClick={() => navigate("/ppk/database")}>
              <a href="">BACKUP</a>
            </li>
            <li onClick={() => navigate("/ppk/print")}>
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
              <input
                type="text"
                placeholder="Pencarian"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="icon-search">
                <Icon icon="icomoon-free:search" width="15" />
              </div>
            </div>

            <ExportExcelButton data={dataExport} filename="data_pegawai" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>NIP</th>
                <th>Pangkat</th>
                <th>Gol/Ruang</th>
                <th>Jabatan</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7">Memuat data...</td>
                </tr>
              ) : filteredPegawaiData.length > 0 ? (
                filteredPegawaiData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.emp_id}</td>
                    <td>{data.rank}</td>
                    <td>{data.gol_room}</td>
                    <td>{data.position}</td>
                    <td>{data.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Tidak ada data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div id="Relog">
          <div className="detail-Relog">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeRelog}
            />
            <div className="image-Relog">
              <img src={GifFailed} alt="Relog" className="img-Failed" />
            </div>
            <p className="desc-Relog">
              Akses Login Anda Sudah Expired, Silahkan Login Ulang!!
            </p>
            <button className="btn-Relog" onClick={closeRelog}>
              Login Ulang
            </button>
          </div>
        </div>

        {/*  */}

        <div className="popup-logout" id="popup-logout">
          <div className="detail-logout">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeLogout}
            />
            <div className="image-logout">
              <img src={ImgLogout} alt="" className="img-logout" />
            </div>
            <p className="desc-logout">Anda yakin ingin keluar?</p>
            <div className="con-btn-logout">
              <button
                type="button"
                className="btn-batal-logout"
                onClick={closeLogout}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-keluar"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>

        {/* page laoding */}

        <div className="popup-loading">
          <div className="body-loading" id="body-loading">
            <svg
              class="pl"
              viewBox="0 0 200 200"
              width="200"
              height="200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
                <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
              </defs>
              <circle
                class="pl__ring"
                cx="100"
                cy="100"
                r="82"
                fill="none"
                stroke="url(#pl-grad1)"
                stroke-width="36"
                stroke-dasharray="0 257 1 257"
                stroke-dashoffset="0.01"
                stroke-linecap="round"
                transform="rotate(-90,100,100)"
              />
              <line
                class="pl__ball"
                stroke="url(#pl-grad2)"
                x1="100"
                y1="18"
                x2="100.01"
                y2="182"
                stroke-width="36"
                stroke-dasharray="1 165"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        {/* end page loading */}
        <div className="popup-loading" id="popup-loadingDetail">
          <div className="body-loadingDetail" id="body-loadingDetail">
            <h2 class="animate-loadingDetail">Loading</h2>
            <p>Data Sedang Di Proses...</p>
          </div>
        </div>
      </div>
    );
}

export default DbPeg;
