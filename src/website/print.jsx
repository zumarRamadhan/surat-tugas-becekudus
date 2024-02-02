import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/print.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import ImgLogout from "../Assets/68582-log-out.gif";

function Print() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");
  const { valueInput } = useParams();
  const [nomorSuratTugas, setNomorSuratTugas] = useState("");

  useEffect(() => {
    setNomorSuratTugas(valueInput || "");
  }, [valueInput]);

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "master") {
      navigate("/ppk/print");
    }
  }, []);

  const showSuccess = () => {
    const background = document.querySelector("#popup-success");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-success");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccess = () => {
    const background = document.querySelector("#popup-success");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-success");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
    setTimeout(() => navigate(`/print`), 300);
  };

  const showRelog = () => {
    const background = document.querySelector("#Relog");
    background.style.display = "flex";
    const popUpRelog = document.querySelector(".detail-Relog");
    popUpRelog.style.display = "grid";
    popUpRelog.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeRelog = () => {
    const background = document.querySelector("#Relog");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpRelog = document.querySelector(".detail-Relog");
    setTimeout(() => (popUpRelog.style.display = "none"), 250);
    popUpRelog.style.animation = "slide-up 0.3s ease-in-out";
    navigate(`/login`);
  };

  const showFailed = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popUpFailed = document.querySelector(".detail-Failed");
    popUpFailed.style.display = "grid";
    popUpFailed.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailed = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpFailed = document.querySelector(".detail-Failed");
    setTimeout(() => (popUpFailed.style.display = "none"), 250);
    popUpFailed.style.animation = "slide-up 0.3s ease-in-out";
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
    const PopupLoading = document.querySelector(".body-loading");
    setTimeout(() => (PopupLoading.style.display = "none"), 250);
    PopupLoading.style.animation = "slide-up 0.3s ease-in-out";
  };

  const handlePrint = async (type) => {
    const apiUrl =
      type === "ST"
        ? `${apiurl}assignment/printst/${nomorSuratTugas}`
        : `${apiurl}assignment/printspd/${nomorSuratTugas}`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${saveToken}`,
      "ngrok-skip-browser-warning": "any",
    };

    try {
      // Menampilkan popup loading
      showPopupLoading();

      const response = await axios.get(apiUrl, {
        responseType: "blob",
        headers: headers,
      });

      // Menyembunyikan popup loading
      closePopupLoading();

      // Membuat objek URL dari blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Membuat elemen <a> untuk menginisialisasi pengunduhan
      const link = document.createElement("a");
      // Menyesuaikan nama file sesuai dengan jenis surat tugas

      const fileName = type === "SPD" ? "outputSPD.zip" : "outputST.docx";

      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);

      // Simulasikan klik pada elemen <a> untuk menginisialisasi pengunduhan
      link.click();

      // Hapus elemen <a> setelah selesai pengunduhan
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Menampilkan popup berhasil
      showSuccess();
    } catch (error) {
      // Menyembunyikan popup loading

      if (error.response && error.response.status === 401) {
        showRelog();
        closePopupLoading();
      } else {
        closePopupLoading();
        showFailed();
      }
    }
  };

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
          <li onClick={() => navigate("/forminput")}>
            <a href="">INPUT</a>
          </li>
          <li onClick={() => navigate("/db")}>
            <a href="">DB</a>
          </li>
          <li onClick={() => navigate("/database")}>
            <a href="">BACKUP</a>
          </li>
          <li className="active">
            <a href="">PRINT</a>
          </li>
          <li onClick={() => navigate("/dbpeg")}>
            <a href="">DBPEG</a>
          </li>
        </ul>
      </header>

      <div className="container">
        <div className="title-form">
          <h1>DASHBOARD PERCETAKAN</h1>
        </div>

        <div className="box-print">
          <div className="head-print">
            MASUKAN&nbsp;NO&nbsp;IDENTITAS&nbsp;:&nbsp;
            <input
              type="number"
              placeholder="....."
              value={nomorSuratTugas}
              onChange={(e) => setNomorSuratTugas(e.target.value)}
            />
          </div>

          <div className="box-print1">
            <p>SURAT TUGAS</p>
            <button className="btn-print" onClick={() => handlePrint("ST")}>
              PRINT
            </button>
          </div>

          <div className="box-print2">
            <p>SURAT PERJALANAN DINAS</p>
            <button className="btn-print" onClick={() => handlePrint("SPD")}>
              PRINT
            </button>
          </div>

          <button className="folder-output">
            <p>Folder Output</p>
          </button>
        </div>
      </div>

      <div id="popup-success">
        <div className="detail-success">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeSuccess}
          />
          <div className="image-success">
            <img
              src={GifSuccess}
              alt="Delete Success"
              className="img-success"
            />
          </div>
          <p className="desc-success">Data berhasil diperbarui!</p>
          <button className="btn-success" onClick={closeSuccess}>
            Kembali
          </button>
        </div>
      </div>

      <div id="popup-Failed">
        <div className="detail-Failed">
          <Icon
            icon="radix-icons:cross-circled"
            width="30"
            style={{ cursor: "pointer" }}
            onClick={closeFailed}
          />
          <div className="image-Failed">
            <img src={GifFailed} alt="Edit Data" className="img-Failed" />
          </div>
          <p className="desc-Failed">Gagal print, silahkan coba lagi!</p>
          <button className="btn-Failed" onClick={closeFailed}>
            Kembali
          </button>
        </div>
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
            <button type="button" className="btn-batal-logout" onClick={closeLogout}>
              Batal
            </button>
            <button type="button" className="btn-keluar" onClick={handleLogout}>
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
    </div>
  );
}

export default Print;
