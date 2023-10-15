import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/editsurattugas.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function EditST() {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="logo">
          <img src={LogoAPKB} />
        </div>
      </header>

      <div className="container">
      <div className="header-title">
        <button className="btn-back" onClick={() => navigate("/db")}>
            <Icon icon="icon-park-outline:back" className="icon-back"/>
        </button>
        <div className="title-form-edit-st">
          <h1>EDIT SURAT TUGAS & SPD</h1>
        </div>
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
            <input type="text" placeholder="Input No ST"/>
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
              style={{ resize: "none" }}
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

export default EditST;
