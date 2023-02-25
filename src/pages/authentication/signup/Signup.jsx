import React, { useState } from "react";
import "./signup.scss";
import hero from "../../../assets/png/loginImage.png";
import logintop from "../../../assets/png/loginTop.png";
import Logo from "../../../assets/png/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  signupcall,
  Logincall,
} from "../../../functionalities/AuthenticationMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/actionCreators/login/loginAction";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisable] = useState(0);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const baseUrl = "https://ticketappbackend.vercel.app/api/user";

  const handleSubmit = async (e) => {
    setDisable(1);
    e.preventDefault();

    const res = await signupcall(`${baseUrl}/register`, {
      name: `${data.firstname} ${data.lastname}`,
      email: data.email,
      password: data.password,
      role: "user",
    });
    if (res.status === 200) {
      toast.success("Signup Successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const user = await Logincall(`${baseUrl}/login`, {
        email: data.email,
        password: data.password,
      });
      dispatch(loginAction(user.data));
      if (user.data.user.role === "super_admin") {
        navigate("/superadmin");
      }
      if (user.data.user.role === "admin") {
        navigate("/admin");
      }
      if (user.data.user.role === "user") {
        navigate("/user");
      }
    } else {
      toast.error(`Error: ${res.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setDisable(0);
  };
  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const { firstname, lastname, email, password } = data;
  return (
    <div className="signup_wrapper">
      <ToastContainer />
      <img className="signup_top" src={logintop} alt="" />
      <div
        onClick={() => {
          navigate("/");
        }}
        className="signup_header"
      >
        <img src={Logo} alt="" />
      </div>
      <div className="signup_form_container">
        <img className="signup_hero" src={hero} alt="" />
        <div className="signup_form_wrap">
          <div className="signup_form_header">
            <h1 className="signup_form_header_text1">Get Started.</h1>
            <div className="signup_form_header_text2_wrap">
              <p className="signup_form_header_text2_item1">
                Already an account?
              </p>
              <p className="signup_form_header_text2_item2">
                <Link to="/login">Log in</Link>
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="signup_form"
          >
            <div className="signup_form_name">
              <div className="signup_form_first_name">
                <label
                  className="signup_form_first_name_label"
                  htmlFor="firstname"
                >
                  First name
                </label>
                <input
                  required
                  className="signup_form_first_name_input"
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </div>
              <div className="signup_form_last_name">
                <label
                  className="signup_form_last_name_label"
                  htmlFor="lastname"
                >
                  Last name
                </label>
                <input
                  required
                  className="signup_form_last_name_input"
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </div>
            </div>
            <div className="signup_form_email">
              <label className="signup_form_email_label" htmlFor="email">
                Email address
              </label>
              <input
                required
                className="signup_form_email_input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="signup_form_password">
              <label className="signup_form_password_label" htmlFor="password">
                Password
              </label>
              <input
                required
                className="signup_form_password_input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <button disabled={disable} className="signup_button">
              {disable ? "Signing Up..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
