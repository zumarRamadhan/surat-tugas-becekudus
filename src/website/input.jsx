// import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import LogoAPKB from '../Assets/LOGOAPKB.png';
import '../Style/inputform.css';
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";

function FormInputSuratPenugasan() {
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
          <li>
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
      </div>
    </div>
  );
}

export default FormInputSuratPenugasan;
