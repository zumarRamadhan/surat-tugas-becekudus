import { useState, useEffect } from "react";
import LogoAPKB from "../Assets/LOGOAPKB.png";
import LogoFooter from "../Assets/footer-logo 1.png";
import "../Style/login.css";
import { useNavigate, Link, useParams } from "react-router-dom";
// import apiurl from "../api/api";
import axios from "axios";
import { Icon } from "@iconify/react";

function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const [isLoading, setisLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    console.log("mengirim data");
    axios
      .post('https://gorgeous-boa-smiling.ngrok-free.app/api/login', {
        name: name,
        password: password
      })
      .then((response)=>{
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        setisLoading(false);
        if (response.data.access_token !== undefined)
          return window.location.replace("/dbpeg");
        })
        .catch((err) => {
          // console.log("terjadi kesalahan : ", err);
          // showFailed();
          console.log(err.response);
          setisLoading(false);
        });
    };

  return (
    <div className="body-login">
      <div className="box-login">
        <h1>Login</h1>
        <form action="" onSubmit={login}>
          <p>Name</p>
          <input type="text" placeholder="Name"  id="name"
                name="name" value={name}
                onChange={handleName} required />
          <p>Password</p>
          <input type="password" placeholder="Password"  name="password"
                className="input-password"
                value={password}
                onChange={handlePassword} required />
          <button type="submit" value="Login">Login</button>
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
