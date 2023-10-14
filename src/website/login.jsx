import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import LogoFooter from "../Assets/footer-logo 1.png";
import "../Style/login.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
// import axios from "axios";
import { Icon } from "@iconify/react";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="body-login">
      <div className="box-login">
        <h1>Login</h1>
        <form action="">
          <p>Email</p>
          <input type="text" placeholder="Email" required />
          <p>Password</p>
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* <footer>
        <img src={LogoFooter} />
      </footer>
      <div className="copyright">
        <p>© KPPBC Tipe Madya Cukai Kudus | 2018</p>
      </div> */}
    </div>
  );
}

export default Login;
