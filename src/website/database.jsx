import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/database.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function Database() {
  const navigate = useNavigate();
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
          <li className="active">
            <a href="">DATABASE</a>
          </li>
          <li onClick={() => navigate("/print")}>
            <a href="">PRINT</a>
          </li>
          <li onClick={() => navigate("/dbpeg")}>
            <a href="">DBPEG</a>
          </li>
          <li onClick={() => navigate("/ppk")}>
            <a href="">PPK</a>
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
        </div>
        <table>
          <tr>
            <th id="id">ID ST</th>
            <th id="eselon">ESELON IV</th>
            <th id="dpt">DASAR PELAKSANAAN TUGAS</th>
            <th id="nost">NO ST</th>
            <th id="datest">TANGGAL ST</th>
            <th id="pegawai">PEGAWAI</th>
            <th id="maksud">MAKSUD PERJALANAN DINAS</th>
            <th id="ktt">KANTOR TUJUAN TUGAS</th>
            <th id="kt1">KOTA TUJUAN I</th>
            <th id="tb">TANGGAL BERANGKAT</th>
            <th id="tk">TANGGAL KEMBALI</th>
            <th id="nospd">NO SPD</th>
            <th id="datespd">TANGGAL SPD</th>
            <th id="transport">TRANSPORT</th>
            <th id="pencairan">PENCAIRAN</th>
            <th id="nospyt">NO SPYT (SPD DALAM KOTA SAJA)</th>
            <th id="dalamkota">
              KANTOR TUJUAN TUGAS SPESIFIK (SPD DALAM KOTA SAJA)
            </th>
            <th id="ndp">ND Permohonan</th>
            <th id="aksi">AKSI</th>
          </tr>
          <tr>
            <td id="id">1</td>
            <td id="eselon">IV/A</td>
            <td id="dpt">Surat Perintah Direksi</td>
            <td id="nost">12345</td>
            <td id="datest">2023-10-01</td>
            <td id="pegawai">John</td>
            <td id="maksud">Kunjungan Kerja</td>
            <td id="ktt">Kantor Pusat</td>
            <td id="kt1">Jakarta</td>
            <td id="tb">2023-10-01</td>
            <td id="tk">2023-10-01</td>
            <td id="nospd">12345</td>
            <td id="datespd">2023-10-01</td>
            <td id="transport">Pesawat</td>
            <td id="pencairan">Kantor</td>
            <td id="nospyt">12345</td>
            <td id="dalamkota">Kantor Pusat</td>
            <td id="ndp">12345</td>
            <td id="action-db">
              <div className="action-db">
                <button className="edit" onClick={() => navigate("/editsurattugas")}>
                  <Icon icon="fluent:edit-16-regular" width="20" />
                </button>
                <button className="delete">
                  <Icon icon="fluent:delete-16-regular" width="20" />
                </button>
                <button className="print">
                  <Icon icon="fluent:print-16-regular" width="20" />
                </button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Database;
