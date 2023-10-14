import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/dbpeg.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function DbPeg() {const navigate = useNavigate();
  
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
          <button className="tambah-data" onClick={() => navigate("/addpegawai")}>Tambah Data</button>
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
          <tr>
            <td id="id">Ari Wirasto</td>
            <td id="eselon">196012231983031002</td>
            <td id="dpt">Penata Tk. 1</td>
            <td id="nost">III/D</td>
            <td id="datest">Kepala Kantor</td>
            <td id="action-db">
              <div className="action-db">
                <button className="edit" onClick={() => navigate("/editpegawai")}>
                  <Icon icon="fluent:edit-16-regular" width="20" />
                </button>
                <button className="delete">
                  <Icon icon="fluent:delete-16-regular" width="20" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td id="id">Ari Wirasto</td>
            <td id="eselon">196012231983031002</td>
            <td id="dpt">Penata Tk. 1</td>
            <td id="nost">III/D</td>
            <td id="datest">Kepala Kantor</td>
            <td id="action-db">
              <div className="action-db">
                <button className="edit" onClick={() => navigate("/editpegawai")}>
                  <Icon icon="fluent:edit-16-regular" width="20" />
                </button>
                <button className="delete">
                  <Icon icon="fluent:delete-16-regular" width="20" />
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td id="id">Ari Wirasto</td>
            <td id="eselon">196012231983031002</td>
            <td id="dpt">Penata Tk. 1</td>
            <td id="nost">III/D</td>
            <td id="datest">Kepala Kantor</td>
            <td id="action-db">
              <div className="action-db">
                <button className="edit" onClick={() => navigate("/editpegawai")}>
                  <Icon icon="fluent:edit-16-regular" width="20" />
                </button>
                <button className="delete">
                  <Icon icon="fluent:delete-16-regular" width="20" />
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default DbPeg;
