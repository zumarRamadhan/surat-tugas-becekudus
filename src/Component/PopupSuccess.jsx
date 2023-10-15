import { useState, useEffect } from "react";
import "../Css Component/PopupSuccess.css";
import GifSuccess from "../Assets/gif-success.gif";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function PopupSuccess() {
  const closeSuccess = () => {
    const background = document.querySelector("#popup-success");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-success");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
    window.location.reload();
  };
  return (
    <div>
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
          <p className="desc-success">Data Berhasil Ditambahkan</p>
          <button className="btn-success" onClick={closeSuccess}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupSuccess;
