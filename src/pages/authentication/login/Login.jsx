import React, { useState } from "react";
import "./login.scss";
import hero from "../../../assets/png/loginImage.png";
import logintop from "../../../assets/png/loginTop.png";
import Logo from "../../../assets/png/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Logincall } from "../../../functionalities/AuthenticationMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/actionCreators/login/loginAction";

const Login = () => {
  //a navigation hook
  const navigate = useNavigate();
  //disable button to prevent debounce
  const [disable, setDisable] = useState(0);
  //input data state
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //calling dispatch hook to update login store
  const dispatch = useDispatch();
  //baseUrl
  const baseUrl = "https://ticketappbackend.vercel.app/api/user";

  //handle submit method
  const handleSubmit = async (e) => {
    setDisable(1);
    e.preventDefault();

    const user = await Logincall(`${baseUrl}/login`, {
      email: data.email,
      password: data.password,
    });

    //----------handling toast and user dispatch----------------------
    if (user.status === 200) {
      dispatch(loginAction(user.data));
      toast.success("Login Successful", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      toast.error(`Error: ${user.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setDisable(0);
  };

  //update input state based on input in field
  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  //destructuring email and password from the data state to give access to input value
  const { email, password } = data;

  return (
    <div className="login_wrapper">
      <ToastContainer />
      <img className="login_top" src={logintop} alt="" />
      <div
        onClick={() => {
          navigate("/");
        }}
        className="login_header"
      >
        <img src={Logo} alt="" />
      </div>
      <div className="login_form_container">
        <img className="login_hero" src={hero} alt="" />
        <div className="login_form_wrap">
          <div className="login_form_header">
            <h1 className="login_form_header_text1">Welcome.</h1>
            <div className="login_form_header_text2_wrap">
              <p className="login_form_header_text2_item1">
                Don’t have an account?
              </p>
              <p className="login_form_header_text2_item2">
                <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="login_form"
          >
            <div className="login_form_email">
              <label className="login_form_email_label" htmlFor="email">
                Email address
              </label>
              <input
                required
                className="login_form_email_input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="login_form_password">
              <label className="login_form_password_label" htmlFor="password">
                Password
              </label>
              <input
                required
                className="login_form_password_input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <button disabled={disable} className="login_button">
              {disable ? "Logging..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
