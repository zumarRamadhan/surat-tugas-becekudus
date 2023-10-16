import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/addpegawai.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";

function AddPegawai() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");

  const showSuccessAdd = () => {
    const popupLogout = document.querySelector("#popup-success");
    popupLogout.style.display = "flex";
    popupLogout.style.animation = "slide-down 0.3s ease-in-out";
  };

  const closeSuccess = () => {
    const popupLogout = document.querySelector("#popup-success");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
    window.location.reload();
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

  const [formData, setFormData] = useState({
    // Inisialisasi nilai awal untuk setiap field formulir
    name: "",
    emp_id: "",
    rank: "",
    gol_room: "",
    position: "",
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
      console.log("mengirim data");
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
          console.log("data API", result.data);
          const responseAPI = result.data;
          // setPegawaiData(responseAPI.data);
          setIsLoading(false);
          setFormData({
            name: "",
            emp_id: "",
            rank: "",
            gol_room: "",
            position: "",
          });
          setIsSubmitting(false);
          showSuccessAdd();
          closePopupLoading();
        })
        .catch((err) => {
          console.log("terjadi kesalahan: ", err);
          // setIsError(true);
          setIsLoading(false);
          showFailed();
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
      // showPopupLoading();
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name) errors.name = "Nama harus diisi";
    if (!data.emp_id) errors.emp_id = "NIP harus diisi";
    if (!data.rank) errors.rank = "Pangkat harus diisi";
    if (!data.gol_room) errors.gol_room = "Gol/Ruang harus diisi";
    if (!data.position) errors.position = "Jabatan harus diisi";

    return errors;
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={LogoAPKB} />
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
          <button className="btn-import-excel">
            <h1>IMPORT EXCEL</h1>
          </button>
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
              type="text"
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
          <p className="desc-success">SELAMAT DATANG DI NUGASYUK!!!</p>
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
          <p className="desc-Failed">
            Email atau Password yang anda masukkan salah!!!
          </p>
          <button className="btn-Failed" onClick={closeFailed}>
            Kembali
          </button>
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
