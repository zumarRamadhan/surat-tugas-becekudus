import React, { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/editpegawai.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import ImgLogout from "../Assets/68582-log-out.gif";

function EditPegawai() {
  const { id } = useParams();
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "master") {
      navigate("/ppk/dbpeg");
    }
  }, []);

  const showSuccessEdit = () => {
    const background = document.querySelector("#popup-success");
    background.style.display = "flex";
    const popupLogout = document.querySelector(".detail-success");
    popupLogout.style.display = "grid";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccessEdit = () => {
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
    window.location.replace("/");
  };

  const showFailed = () => {
    const background = document.querySelector("#popup-Failed");
    background.style.display = "flex";
    const popUpLogin = document.querySelector(".detail-Failed");
    popUpLogin.style.display = "grid";
    popUpLogin.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailed = () => {
    const background = document.querySelector("#popup-Failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpLogin = document.querySelector(".detail-Failed");
    setTimeout(() => (popUpLogin.style.display = "none"), 250);
    popUpLogin.style.animation = "slide-up 0.3s ease-in-out";
  };

  const showFailedDeleteHeadOfficer = () => {
    const background = document.querySelector("#popup-FailedHeadOfficer");
    background.style.display = "flex";
    const popupFailedDelete = document.querySelector(
      ".detail-FailedHeadOfficer"
    );
    popupFailedDelete.style.display = "grid";
    popupFailedDelete.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeFailedDeleteHeadOfficer = () => {
    const background = document.querySelector("#popup-FailedHeadOfficer");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupFailedDelete = document.querySelector(
      ".detail-FailedHeadOfficer"
    );
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
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pegawaiData, setPegawaiData] = useState([]);

  useEffect(() => {
    showPopupLoading();
    axios
      .get(`${apiurl}employee/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${saveToken}`,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((response) => {
        setPegawaiData(response.data.data[0]);
        setFormData({
          name: response.data.data[0].name,
          email: response.data.data[0].email,
          emp_id: response.data.data[0].emp_id,
          rank: response.data.data[0].rank,
          gol_room: response.data.data[0].gol_room,
          position: response.data.data[0].position,
          role: response.data.data[0].role,
        });
        setIsError(false);
        closePopupLoading();
        // closePopupLoadingDetail();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data :", error);
        setIsError(true);
      });
  }, [id, saveToken]);

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
        .post(`${apiurl}employee/edit/${id}`, form, {
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
          showSuccessEdit();
          closePopupLoading();
        })
        .catch((error) => {
          console.log("terjadi kesalahan: ", error);

          if (error.response && error.response.status === 401) {
            showRelog();
          } else if (error.response && error.response.status === 420) {
            // Penanganan ketika respons adalah 420
            showFailedDeleteHeadOfficer();
          } else {
            setIsLoading(false);
            showFailed();
            setIsSubmitting(false);
          }

          closePopupLoading();
        });
    }
  }, [isSubmitting, formData, id, saveToken, navigate]);

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
            <img src={LogoAPKB} alt="Logo" />
          </div>
        </header>
        <div className="container">
          <div className="header-title">
            <button className="btn-back" onClick={() => navigate("/dbpeg")}>
              <Icon icon="icon-park-outline:back" className="icon-back" />
            </button>
            <div className="title-form-add-pegawai">
              <h1>EDIT DATA PEGAWAI</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="body-form-add-pegawai">
            <div className="form-input">
              <p>Nama</p>
              <input
                type="text"
                id="name"
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
                id="emp_id"
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
                id="rank"
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
                id="gol_room"
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
                id="position"
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
                      id="role"
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
                      id="role"
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
              <h1>EDIT</h1>
            </button>
          </form>
        </div>

        <div id="popup-success">
          <div className="detail-success">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeSuccessEdit}
            />
            <div className="image-success">
              <img
                src={GifSuccess}
                alt="Delete Success"
                className="img-success"
              />
            </div>
            <p className="desc-success">Data berhasil diperbarui!</p>
            <button className="btn-success" onClick={closeSuccessEdit}>
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
            <p className="desc-Failed">Gagal memperbaharui data!</p>
            <button className="btn-Failed" onClick={closeFailed}>
              Kembali
            </button>
          </div>
        </div>

        <div id="popup-FailedHeadOfficer">
          <div className="detail-FailedHeadOfficer">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeFailedDeleteHeadOfficer}
            />
            <div className="image-FailedHeadOfficer">
              <img
                src={GifFailed}
                alt="Delete Failed"
                className="img-FailedHeadOfficer"
              />
            </div>
            <p className="desc-FailedHeadOfficer">
              Anda tidak bisa mengedit data kepala kantor karena{" "}
              <b>belom ada data pengganti!</b>
            </p>
            <button
              className="btn-FailedHeadOfficer"
              onClick={closeFailedDeleteHeadOfficer}
            >
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
      </div>
    );
}

export default EditPegawai;
