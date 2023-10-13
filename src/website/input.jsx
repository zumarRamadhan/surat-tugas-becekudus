// import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/inputform.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";

function FormInputSuratPenugasan() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="logo">
          <img src={LogoAPKB} />
        </div>
        <ul className="navbar">
          <li className="active">
            <a href="">INPUT</a>
          </li>
          <li onClick={() => navigate("/db")}>
            <a href="">DB</a>
          </li>
          <li>
            <a href="">DATABASE</a>
          </li>
          <li>
            <a href="">PRINT</a>
          </li>
          <li>
            <a href="">DBPEG</a>
          </li>
        </ul>
      </header>

      <div className="container">
        <div className="title-form">
          <h1>FORM INPUT</h1>
        </div>
        <div className="body-form">
          <div className="form-input">
            <p>ID</p>
            <input type="text" placeholder="Input ID" />
          </div>
          <div className="form-input">
            <p>Tanggal SPD</p>
            <input type="date" />
          </div>
          <div className="form-input">
            <p>Unit</p>
            <input type="text" placeholder="Input Unit" />
          </div>
          <div className="form-input">
            <p>No SPYT</p>
            <input type="text" placeholder="Input No SPYT" />
          </div>
          <div className="form-input">
            <p>No ND Permohonan ST</p>
            <input type="text" placeholder="Input No ND Permohonan ST" />
          </div>
          <div className="form-input">
            <p>Tanggal Berangkat</p>
            <input type="date" />
          </div>
          <div className="form-input">
            <p>No ST</p>
            <input type="text" />
          </div>
          <div className="form-input">
            <p>Tanggal Kembali</p>
            <input type="date" />
          </div>
          <div className="form-input">
            <p>Tanggal ST</p>
            <input type="date" />
          </div>
          <div className="form-input">
            <p>Pencairan DIPA</p>
            <input type="text" placeholder="Input Pencairan DIPA" />
          </div>
          <div className="form-input">
            <p>No SPD</p>
            <input type="text" placeholder="Input No SPD" />
          </div>
          <div className="form-input">
            <p>Tagging</p>
            <div className="button-tangging">
              <button id="cancel">BATAL</button>
              <button id="continue">Kegiatan Online</button>
            </div>
          </div>
        </div>
        <div className="body-form">
          <div className="form-input">
            <p>Dasar Pelaksanaan Tugas</p>
            <input type="text" placeholder="Input Dasar Pelaksanaan Tugas" />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas I</p>
            <input type="text" placeholder="Input Kota Tujuan Tugas I" />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas II</p>
            <input type="text" placeholder="Input Kota Tujuan Tugas II" />
          </div>
          <div className="form-input">
            <p>Kota Tujuan Tugas III</p>
            <input type="text" placeholder="Input Kota Tujuan Tugas III" />
          </div>
          <div className="form-input">
            <p>Maksud Perjalanan Dinas</p>
            <input type="text" placeholder="Input Maksud Perjalanan Dinas" />
          </div>
          <div className="form-input">
            <p>Kantor Tujuan Tugas</p>
            <input type="text" placeholder="Input Kantor Tujuan Tugas" />
          </div>
          <div className="form-input">
            <p>Transport</p>
            <input type="text" placeholder="Input Transport" />
          </div>
          <div className="form-input">
            <p>Pegawai</p>
            <input type="text" placeholder="Input Pegawai" />
          </div>
          <div className="form-input">
            <p>Pejabat Penanda Tangan ST & SPD</p>
            <input
              type="text"
              placeholder="Input Pejabat Penanda Tangan ST & SPD"
            />
          </div>
          <div className="form-input">
            <p>Kantor Tujuan Tugas Spesifik (Spd Dalam Kota Saja)</p>
            <textarea
              name=""
              id=""
              rows="5"
              placeholder="Input Kantor Tujuan Tugas Spesifik"
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <div className="form-input">
            <p>Kota Asal Tujuan</p>
            <input type="text" placeholder="Input Kota Asal Tujuan" />
          </div>
          <div className="form-input">
            <div className="button-form">
              <button id="save">Simpan</button>
              <button id="clear">Clear Form</button>
              <button id="add">Tambah Pegawai</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInputSuratPenugasan;
