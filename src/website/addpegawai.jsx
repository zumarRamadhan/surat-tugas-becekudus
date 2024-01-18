import React, { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/addpegawai.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import Select from "react-select";
import ImgLogout from "../Assets/68582-log-out.gif";

function AddPegawai() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "master") {
      navigate("/ppk/db");
    }
  }, []);

  const showSuccessAdd = () => {
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
    setTimeout(() => navigate(`/dbpeg`), 300);
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
    window.location.reload();
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

  const [formData, setFormData] = useState({
    name: "",
    emp_id: "",
    rank: "",
    gol_room: "",
    position: "",
    role: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("emp_id", formData.emp_id);
      form.append("rank", formData.rank);
      form.append("gol_room", formData.gol_room);
      form.append("position", formData.position);
      form.append("role", formData.role);

      showPopupLoading();

      axios
        .post(`${apiurl}employee/add`, form, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((result) => {
          const responseAPI = result.data;
          setIsLoading(false);
          setFormData({
            name: "",
            emp_id: "",
            rank: "",
            gol_room: "",
            position: "",
            role: "",
          });
          setIsSubmitting(false);
          showSuccessAdd();
          closePopupLoading();
        })
        .catch((error) => {
          console.log("terjadi kesalahan: ", error);

          if (error.response && error.response.status === 401) {
            showRelog();
          } else {
            setIsLoading(false);
            showFailed();
            setIsSubmitting(false);
          }

          closePopupLoading();
        });
    }
  }, [isSubmitting, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name) errors.name = "Nama harus diisi";
    if (!data.emp_id) errors.emp_id = "NIP harus diisi";
    if (!data.rank) errors.rank = "Pangkat harus diisi";
    if (!data.gol_room) errors.gol_room = "Gol/Ruang harus diisi";
    if (!data.position) errors.position = "Jabatan harus diisi";
    if (!data.role) errors.role = "Role harus dipilih salah satu";

    return errors;
  };

  const importExcel = (file) => {
    showPopupLoading();
    const form = new FormData();
    form.append("file", file);
    axios
      .post(`${apiurl}employee/import`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((response) => {
        console.log("Import successful:", response.data);
        // navigate("/dbpeg");
        showSuccessAdd();
        closePopupLoading();
      })
      .catch((error) => {
        console.log("terjadi kesalahan: ", error);

        if (error.response && error.response.status === 401) {
          showRelog();
        } else {
          setIsLoading(false);
          showFailed();
          setIsSubmitting(false);
        }

        closePopupLoading();
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      importExcel(file);
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
          <img src={LogoAPKB} alt="Logo" />
        </div>
      </header>
      <div className="container">
        <div className="header-title">
          <button className="btn-back" onClick={() => navigate("/dbpeg")}>
            <Icon icon="icon-park-outline:back" className="icon-back" />
          </button>
          <div className="title-form-add-pegawai">
            <h1>TAMBAH DATA PEGAWAI</h1>
          </div>
          <label htmlFor="fileInput" className="btn-import-excel">
            <h1>IMPORT EXCEL</h1>
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <form onSubmit={handleSubmit} className="body-form-add-pegawai">
          <div className="form-input">
            <p>Nama</p>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Nama"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-input">
            <p>Nip</p>
            <input
              type="number"
              name="emp_id"
              onChange={handleChange}
              value={formData.emp_id}
              placeholder="Nip"
            />
            {errors.emp_id && <span className="error">{errors.emp_id}</span>}
          </div>
          <div className="form-input">
            <p>Pangkat</p>
            <input
              type="text"
              name="rank"
              onChange={handleChange}
              value={formData.rank}
              placeholder="Pangkat"
            />
            {errors.rank && <span className="error">{errors.rank}</span>}
          </div>
          <div className="form-input">
            <p>Gol/Ruang</p>
            <input
              type="text"
              name="gol_room"
              onChange={handleChange}
              value={formData.gol_room}
              placeholder="Gol/Ruang"
            />
            {errors.gol_room && (
              <span className="error">{errors.gol_room}</span>
            )}
          </div>
          <div className="form-input">
            <p>Jabatan</p>
            <input
              type="text"
              name="position"
              onChange={handleChange}
              value={formData.position}
              placeholder="Jabatan"
            />
            {errors.position && (
              <span className="error">{errors.position}</span>
            )}
          </div>
          <div className="form-input">
            <p>Role</p>
            <div className="switch-inputRole">
              <div className="con-radio">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="biasa"
                    checked={formData.role === "biasa"}
                    onChange={handleChange}
                  />
                  BIASA
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="ppk"
                    checked={formData.role === "ppk"}
                    onChange={handleChange}
                  />
                  PPK
                </label>
              </div>
            </div>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <button type="submit" className="btn-tambah-pegawai">
            <h1>TAMBAH</h1>
          </button>
        </form>
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
          <p className="desc-success">Data berhasil ditambahkan!</p>
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
            <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
          </div>
          <p className="desc-Failed">Gagal menambahkan data!</p>
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
            <button
              type="button"
              className="btn-batal-logout"
              onClick={closeLogout}
            >
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

export default AddPegawai;
