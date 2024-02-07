import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/db.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";
import GifSuccess from "../Assets/gif-success.gif";
import GifFailed from "../Assets/gif-failed.gif";
import GifDelate from "../Assets/gif-delete.gif";
import ExportExcelButton from "../Component/exportfile";
import ImgLogout from "../Assets/68582-log-out.gif";

function Db() {
  const navigate = useNavigate();
  const saveToken = sessionStorage.getItem("token");
  const [dataExport, setDataExport] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("role") !== "master") {
      navigate("/ppk/db");
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");

    const background = document.querySelector("#Relog");
    background.style.display = "flex";
    const popUpLogin = document.querySelector(".detail-Relog");
    popUpLogin.style.display = "grid";
    popUpLogin.style.animation = "slide-down 0.3s ease-in-out";
    closePopupLoading();
  };

  const closeRelog = () => {
    const background = document.querySelector("#Relog");
    setTimeout(() => (background.style.display = "none"), 300);
    const popUpLogin = document.querySelector(".detail-Relog");
    setTimeout(() => (popUpLogin.style.display = "none"), 250);
    popUpLogin.style.animation = "slide-up 0.3s ease-in-out";
    window.location.replace("/");
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
    const PopupLoading = document.querySelector(".body-loading");
    setTimeout(() => (PopupLoading.style.display = "none"), 250);
    PopupLoading.style.animation = "slide-up 0.3s ease-in-out";
  };

  const [assignmentData, setAssignmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [assignmentToDelete, SetAssignmentToDelete] = useState({});

  useEffect(() => {
    setIsLoading(true);
    showPopupLoading();
    axios
      .get(`${apiurl}assignment/data`, {
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
        setAssignmentData(responseAPI.data);
        setIsLoading(false);
        closePopupLoading();
      })
      .catch((err) => {
        console.log("terjadi kesalahan: ", err);
        if (err.response && err.response.status === 401) {
          showRelog();
        }
        else {
          setIsLoading(false);
          setIsError(true);
          closePopupLoading();
        }
      });
  }, []);

  const showDeletePopup = (id) => {
    const background = document.querySelector("#popup-Delete");
    background.style.display = "flex";
    const popupDelete = document.querySelector(".detail-Delete");
    popupDelete.style.display = "block";
    popupDelete.style.animation = "slide-down 0.3s ease-in-out";
    SetAssignmentToDelete(id);
  };

  const handleDelete = () => {
    if (assignmentToDelete) {
      showPopupLoading();
      axios
        .delete(`${apiurl}assignment/delete/${assignmentToDelete}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${saveToken}`,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((response) => {
          // Penanganan ketika penghapusan berhasil
          console.log("Data berhasil dihapus");
          closeDeletePopup();
          showSuccessDelete();
          closePopupLoading();
        })
        .catch((error) => {
          // Penanganan ketika terjadi kesalahan saat menghapus data
          console.log("Terjadi kesalahan saat menghapus data:", error);
          showFailedDelete();
          closeDeletePopup();
          closePopupLoading();
        });
    }
  };

  const closeDeletePopup = () => {
    const background = document.querySelector("#popup-Delete");
    setTimeout(() => (background.style.display = "none"), 300);
    // background.style.display = "none";
    const popupDelete = document.querySelector(".detail-Delete");
    setTimeout(() => (popupDelete.style.display = "none"), 250);
    popupDelete.style.animation = "slide-up 0.3s ease-in-out";
  };

  // search

  // Filter data based on the search term
  const filteredAssignmentData = assignmentData.filter((data) => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    return (
      (data.head_officer &&
        data.head_officer.toLowerCase().includes(searchTermLowerCase)) ||
      (data.nomor_identitas &&
        data.nomor_identitas
          .toString()
          .toLowerCase()
          .includes(searchTermLowerCase)) ||
      (data.ppk && data.ppk.toLowerCase().includes(searchTermLowerCase)) ||
      (data.ndreq_st && data.ndreq_st.includes(searchTerm)) ||
      (data.no_st && data.no_st.includes(searchTerm)) ||
      (data.unit && data.unit.includes(searchTerm)) ||
      (data.nomor_st && data.nomor_st.includes(searchTerm)) ||
      (data.date_st && data.date_st.includes(searchTerm)) ||
      (data.no_spd && data.no_spd.includes(searchTerm)) ||
      (data.date_spd && data.date_spd.includes(searchTerm)) ||
      (data.departure_date && data.departure_date.includes(searchTerm)) ||
      (data.return_date && data.return_date.includes(searchTerm)) ||
      (data.plt && data.plt.toLowerCase().includes(searchTermLowerCase)) ||
      (data.disbursement &&
        data.disbursement.toLowerCase().includes(searchTermLowerCase)) ||
      (data.no_spyt && data.no_spyt.includes(searchTerm)) ||
      (data.implementation_tasks &&
        data.implementation_tasks
          .toLowerCase()
          .includes(searchTermLowerCase)) ||
      (data.business_trip_reason &&
        data.business_trip_reason
          .toLowerCase()
          .includes(searchTermLowerCase)) ||
      (data.destination_office &&
        data.destination_office.toLowerCase().includes(searchTermLowerCase)) ||
      (data.city_origin &&
        data.city_origin.toLowerCase().includes(searchTermLowerCase)) ||
      (data.destination_city_1 &&
        data.destination_city_1.toLowerCase().includes(searchTermLowerCase)) ||
      (data.destination_city_2 &&
        data.destination_city_2.toLowerCase().includes(searchTermLowerCase)) ||
      (data.destination_city_3 &&
        data.destination_city_3.toLowerCase().includes(searchTermLowerCase)) ||
      (data.destination_city_4 &&
        data.destination_city_4.toLowerCase().includes(searchTermLowerCase)) ||
      (data.destination_city_5 &&
        data.destination_city_5.toLowerCase().includes(searchTermLowerCase)) ||
      (data.transportation &&
        data.transportation.toLowerCase().includes(searchTermLowerCase)) ||
      (data.signature && data.signature.includes(searchTerm)) ||
      (data.employee &&
        data.employee.toLowerCase().includes(searchTermLowerCase))
    );
  });

  const getStatusColor = (taggingStatus) => {
    switch (taggingStatus) {
      case "canceled":
        return "#FF9D9D"; // Canceled status
      case "online":
        return "#9BB1FF"; // Online status
      default:
        return "#FFFFFF"; // Default status
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

  if (assignmentData && !isError)
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
            <li className="active">
              <a href="">DB</a>
            </li>
            <li onClick={() => navigate("/database")}>
              <a href="">BACKUP</a>
            </li>
            <li onClick={() => navigate("/print")}>
              <a href="">PRINT</a>
            </li>
            <li onClick={() => navigate("/dbpeg")}>
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
            <ExportExcelButton data={dataExport} filename="file_assignment" />
          </div>
          <table>
            <thead>
              <tr>
                <th id="no_st">NO ST</th>
                <th id="nomor_identitas">NO IDENTITAS</th>
                <th id="assignment">PEGAWAI</th>
                <th id="ppk">NAMA PENGINPUT/PPK</th>
                <th id="head_officer">Pejabat Penanda Tangan ST & SPD</th>
                <th id="unit">Sub Bagian/Seksi</th>
                <th id="implementation_tasks">DASAR PELAKSANAAN TUGAS</th>
                <th id="nomor_st">NOMOR ST</th>
                <th id="date_st">TANGGAL ST</th>
                <th id="business_trip_reason">MAKSUD PERJALANAN DINAS</th>
                <th id="destination_office">KANTOR TUJUAN TUGAS</th>
                <th id="destination_city_1">KOTA TUJUAN I</th>
                <th id="destination_city_2">KOTA TUJUAN II</th>
                <th id="destination_city_3">KOTA TUJUAN III</th>
                <th id="departure_date">TANGGAL BERANGKAT</th>
                <th id="return_date">TANGGAL KEMBALI</th>
                <th id="no_spd">NO SPD</th>
                <th id="date_spd">TANGGAL SPD</th>
                <th id="transportation">TRANSPORTASI</th>
                <th id="dipa_search">Pembebanan DIPA</th>
                <th id="no_spyt">NO SPYT (SPD DALAM KOTA SAJA)</th>
                <th id="city_origin">KOTA ASAL</th>
                <th id="ndreq_st">ND Permohonan</th>
                <th id="aksi">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="7">Memuat data...</td>
                </tr>
              ) : filteredAssignmentData.length > 0 ? (
                filteredAssignmentData.map((data, index) => (
                  <tr
                    key={index.id}
                    style={{
                      backgroundColor: getStatusColor(data.tagging_status),
                    }}
                  >
                    <td>{data.no_st !== "null" ? data.no_st : ""}</td>
                    <td>
                      {data.nomor_identitas !== "null"
                        ? data.nomor_identitas
                        : ""}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          data.employee_status === "blank"
                            ? "#FF9D9D"
                            : data.employee_status === "core"
                            ? "#FFF"
                            : "transparent",
                        color:
                          data.employee_status === "blank" ? "#000" : "#4b4b4b",
                      }}
                    >
                      {data.employee !== null ? data.employee : ""}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          data.ppk_status === "non-active"
                            ? "#FF9D9D"
                            : data.ppk_status === "active"
                            ? "#FFF"
                            : "transparent",
                        color:
                          data.ppk_status === "non-active" ? "#000" : "#4b4b4b",
                      }}
                    >
                      {data.ppk !== "null" ? data.ppk : ""}
                    </td>
                    <td
                      style={{
                        backgroundColor:
                          data.head_officer_status === "non-active"
                            ? "#FF9D9D"
                            : data.head_officer_status === "active"
                            ? "#FFF"
                            : "transparent",
                        color:
                          data.head_officer_status === "non-active"
                            ? "#000"
                            : "#4b4b4b",
                      }}
                    >
                      {data.head_officer !== "null" ? data.head_officer : ""}
                    </td>
                    <td>{data.unit !== "null" ? data.unit : ""}</td>
                    <td>
                      {data.implementation_tasks !== "null"
                        ? data.implementation_tasks
                        : ""}
                    </td>
                    <td>{data.nomor_st !== "null" ? data.nomor_st : ""}</td>
                    <td>{data.date_st !== "null" ? data.date_st : ""}</td>
                    <td>
                      {data.business_trip_reason !== "null"
                        ? data.business_trip_reason
                        : ""}
                    </td>
                    <td>
                      {data.destination_office !== "null"
                        ? data.destination_office
                        : ""}
                    </td>
                    <td>
                      {data.destination_city_1 !== "null"
                        ? data.destination_city_1
                        : ""}
                    </td>
                    <td>
                      {data.destination_city_2 !== "null"
                        ? data.destination_city_2
                        : ""}
                    </td>
                    <td>
                      {data.destination_city_3 !== "null"
                        ? data.destination_city_3
                        : ""}
                    </td>
                    <td>
                      {data.departure_date !== "null"
                        ? data.departure_date
                        : ""}
                    </td>
                    <td>
                      {data.return_date !== "null" ? data.return_date : ""}
                    </td>
                    <td>{data.no_spd !== "null" ? data.no_spd : ""}</td>
                    <td>{data.date_spd !== "null" ? data.date_spd : ""}</td>
                    <td>
                      {data.transportation !== "null"
                        ? data.transportation
                        : ""}
                    </td>
                    <td>
                      {data.dipa_search !== "null" ? data.dipa_search : ""}
                    </td>
                    <td>{data.no_spyt !== "null" ? data.no_spyt : ""}</td>
                    <td>
                      {data.city_origin !== "null" ? data.city_origin : ""}
                    </td>
                    <td>{data.ndreq_st !== "null" ? data.ndreq_st : ""}</td>
                    <td id="action-db">
                      <div className="action-db">
                        {data.employee_status !== "blank" && (
                          <button
                            className="edit"
                            onClick={() =>
                              navigate(`/editsurattugas/${data.id}`)
                            }
                          >
                            <Icon icon="fluent:edit-16-regular" width="20" />
                          </button>
                        )}
                        <button
                          className="delete"
                          onClick={() => showDeletePopup(data.id)}
                        >
                          <Icon icon="fluent:delete-16-regular" width="20" />
                        </button>
                        <button className="print">
                          <Icon
                            icon="fluent:print-16-regular"
                            width="20"
                            onClick={() =>
                              navigate(`/print/${data.nomor_identitas}`)
                            }
                          />
                        </button>
                      </div>
                    </td>
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

        <div id="popup-success">
          <div className="detail-success">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeSuccessDelete}
            />
            <div className="image-success">
              <img
                src={GifSuccess}
                alt="Delete Success"
                className="img-success"
              />
            </div>
            <p className="desc-success">Data berhasil dihapus!</p>
            <button className="btn-success" onClick={closeSuccessDelete}>
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
              onClick={closeFailedDelete}
            />
            <div className="image-Failed">
              <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
            </div>
            <p className="desc-Failed">Gagal menghapus data!</p>
            <button className="btn-Failed" onClick={closeFailedDelete}>
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

        <div className="popup-Delete" id="popup-Delete">
          <div className="detail-Delete">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeDeletePopup}
            />
            <div className="image-Delete">
              <img src={GifDelate} alt="" className="img-Delete" />
            </div>
            <p className="desc-Delete">Anda yakin ingin menghapus?</p>
            <div className="con-btn-Delete">
              <button
                type="button"
                className="btn-batal"
                onClick={closeDeletePopup}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                Hapus
              </button>
            </div>
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

export default Db;
