import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/logo.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css"
import axios from "axios";

const Login = () => {
  const router = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleLogin = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, login)
      .then((res) => {
        Swal.close();
        Swal.fire(
          // `${res.data.message}`,
          "Login Success",
          "You clicked the button!",
          "success"
        );
        const token = res.data.access_token;
        const refresh_token = res.data.refresh_token;
        const role = res.data.access_role;
        const username = res.data.access_username;
        // const id = res.data.id;
        // const photo = res.data.data.photo;
        // console.log(token);

        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        // localStorage.setItem("id", id);
        // localStorage.setItem("username", username);
        // localStorage.setItem("role", role);
        // localStorage.setItem("photo", photo);

        // console.log(token);
        // console.log(data);

        router("/");
      })
      .catch((err) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          text: "Something went wrong!",
        });
      })
  };

  return (
    <div>
      <div
        className={`card shadow ${style.card}`}
        style={{
          border: "white",
          width: "400px",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <div className="mx-auto mt-1">
          <img
            src={Logo}
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
            }}
            className="card-img-top mt-2"
            alt="..."
          />
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="d-flex flex-row">Email</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="email"
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-2">
              <label className="d-flex flex-row">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className={`btn mt-3 btn-primary ${style.button}`} style={{ width: "300px" }}>
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
