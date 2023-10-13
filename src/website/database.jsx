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
        </ul>
      </header>
    </div>
  );
}

export default Database;
