import { useState, useEffect } from "react";
import "../Css Component/PopupFailed.css";
import GifFailed from "../Assets/gif-failed.gif";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function PopupFailed() {
  const closeFailed = () => {
    const background = document.querySelector("#popup-failed");
    setTimeout(() => (background.style.display = "none"), 300);
    const popupLogout = document.querySelector(".detail-failed");
    setTimeout(() => (popupLogout.style.display = "none"), 250);
    popupLogout.style.animation = "slide-up 0.3s ease-in-out";
  };
  return (
    <div>
      <div id="popup-Failed">
          <div className="detail-Failed">
            <Icon
              icon="radix-icons:cross-circled"
              width="30"
              style={{ cursor: "pointer" }}
              onClick={closeFailed}
            />
            <div className="image-Failed">
              <img src={GifFailed} alt="Delete Failed" className="img-Failed" />
            </div>
            <p className="desc-Failed">data Gagal Ditambahkan!</p>
            <button className="btn-Failed" onClick={closeFailed}>
              Kembali
            </button>
          </div>
        </div>
    </div>
  );
}

export default PopupFailed;
