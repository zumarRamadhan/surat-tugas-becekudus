import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/addpegawai.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function AddPegawai() {
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
        <button className="btn-back" onClick={() => navigate("/dbpeg")}>
            <Icon icon="icon-park-outline:back" className="icon-back"/>
        </button>
        <div className="title-form-add-pegawai">
          <h1>TAMBAH DATA PEGAWAI</h1>
        </div>
        <button className="btn-import-excel">
            <h1>IMPORT EXCEL</h1>
        </button>
        </div>
        <div className="body-form-add-pegawai">
          <div className="form-input">
            <p>Nama</p>
            <input type="text" placeholder="Nama" />
          </div>
          <div className="form-input">
            <p>Nip</p>
            <input type="text" placeholder="Nip" />
          </div>
          <div className="form-input">
            <p>Pangkat</p>
            <input type="text" placeholder="Pangkat" />
          </div>
          <div className="form-input">
            <p>Gol/Ruang</p>
            <input type="text" placeholder="Gol/Ruang" />
          </div>
          <div className="form-input">
            <p>Jabatan</p>
            <input type="text" placeholder="Jabatan" />
          </div>
          <button className="btn-tambah-pegawai">
            <h1>TAMBAH</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPegawai;
