import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import "../Style/print.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function Print() {
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
          <li onClick={() => navigate("/database")}>
            <a href="">DATABASE</a>
          </li>
          <li className="active">
            <a href="">PRINT</a>
          </li>
          <li onClick={() => navigate("/dbpeg")}>
            <a href="">DBPEG</a>
          </li>
        </ul>
      </header>

      <div className="container">
        <div className="title-form">
          <h1>DASHBOARD PERCETAKAN</h1>
        </div>

        <div className="box-print">
          <div className="head-print">
            NO&nbsp;SURAT&nbsp;TUGAS&nbsp;:&nbsp;
            <input type="number" placeholder="....."/>
          </div>

          <div className="box-print1">
            <p>SURAT TUGAS</p>
            <button className="btn-print">PRINT</button>
          </div>
          <div className="box-print2">
            <p>SURAT PERJALANAN DINAS</p>
            <button className="btn-print">PRINT</button>
          </div>

          <button className="folder-output">
            <p>Folder Output</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Print;
