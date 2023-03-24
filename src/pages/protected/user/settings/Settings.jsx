import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../../redux/actionCreators/login/loginAction";
import { bookingsAction } from "../../../../redux/actionCreators/bookings/bookingsAction";
import axios from "axios";
import "./settings.scss";
import Modal from "../../../../components/Modal/Modal";
const Settings = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(0);
  const [modal, setModal] = useState(0);
  const [toggle, setToggle] = useState("");
  const [data, setData] = useState({
    firstname: "",
    name: "",
    oldpassword: "",
    newpassword: "",
    lastname: "",
    email: "",
    password: "",
  });
  const baseUrl = "https://nsta-be.vercel.app/api/user";
  const token = userData.token;
  const handlePassword = async (e) => {
    setDisable(1);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseUrl}/changepassword`,
        {
          email: userData.user.email,
          old_password: data.oldpassword,
          new_password: data.newpassword,
        },
        {
          headers: { "auth-token": token },
        }
      );
      data.oldpassword = "";
      data.newpassword = "";
      setDisable(0);
      toast.success("Password Changed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(response);
    } catch (error) {
      data.oldpassword = "";
      data.newpassword = "";
      setDisable(0);
      console.log(error);
      toast.error(`Error: Unable to change password`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleUserInfo = async (e) => {
    setDisable(1);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseUrl}/edituserinfo`,
        {
          email: data.email,
          name: data.name,
          _id: userData.user._id,
        },
        {
          headers: { "auth-token": token },
        }
      );
      console.log({
        user: { ...userData.user, name: data.name, email: data.email },
        token: userData.token,
      });
      dispatch(
        loginAction({
          user: { ...userData.user, name: data.name, email: data.email },
          token: userData.token,
        })
      );
      data.name = "";
      data.email = "";
      setDisable(0);
      toast.success("User info updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(response);
    } catch (error) {
      data.name = "";
      data.email = "";
      setDisable(0);
      console.log(error);
      toast.error(`Error: Unable to update user info`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.request({
        url: `${baseUrl}/delete`,
        method: "delete",
        headers: {
          "auth-token": token,
        },
        data: {
          _id: userData.user._id,
        },
      });
      setDisable(0);
      setModal(0);
      dispatch(loginAction(null));
      dispatch(bookingsAction(null));
      navigate("/");
    } catch (err) {
      setDisable(0);
      setModal(0);
      toast.error(`Error: ${err.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const {
    firstname,
    lastname,
    email,
    password,
    name,
    oldpassword,
    newpassword,
  } = data;
  return (
    <div className="userSettings_wrapper">
      <ToastContainer />
      <Modal
        modal={modal}
        setModal={setModal}
        Header={"Delete Account"}
        text={"delete this account"}
        actionText={"Delete"}
        actionMethod={handleDelete}
      />
      <h1 className="usersetting_head_title">User Settings</h1>
      <div className="userSettings_widget">
        <div className="userSettings_button1_wrapper">
          <div className="userSettings_delete">
            <p className="userSettings_delete_text">Delete User Account</p>
            <button
              onClick={() => {
                setModal(!modal);
              }}
              className="userSettings_delete_button"
            >
              Delete
            </button>
          </div>
          <div className="userSettings_password">
            <p className="userSettings_password_text">Change Password</p>
            <button
              onClick={() => {
                setToggle(toggle === "password" ? "" : "password");
              }}
              className="userSettings_password_button"
            >
              Change Password
            </button>
          </div>
          <div
            className={`${
              toggle === "password"
                ? "userSettings_password_edit"
                : "userSettings_password_edit_close"
            }`}
          >
            <form
              onSubmit={(e) => {
                handlePassword(e);
              }}
              className="userSettings_password_form"
            >
              <div className="userSettings_oldpassword_name">
                <div className="userSettings_oldpassword_first_name">
                  <label
                    className="userSettings_oldpassword_first_name_label"
                    htmlFor="firstname"
                  >
                    Old Password
                  </label>
                  <input
                    required
                    className="userSettings_oldpassword_first_name_input"
                    type="password"
                    id="oldpassword"
                    value={oldpassword}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <div className="userSettings_newpassword_name">
                <div className="userSettings_newpassword_first_name">
                  <label
                    className="userSettings_newpassword_first_name_label"
                    htmlFor="firstname"
                  >
                    New Password
                  </label>
                  <input
                    required
                    className="userSettings_newpassword_first_name_input"
                    type="password"
                    id="newpassword"
                    value={newpassword}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
              </div>
              <button
                disabled={disable}
                className="userSettings_password_button"
              >
                {disable ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
          <div className="userSettings_edit">
            <p className="userSettings_edit_text">Edit user Account Info!</p>
            <button
              onClick={() => {
                setToggle(toggle === "edit" ? "" : "edit");
              }}
              className="userSettings_edit_button"
            >
              Edit
            </button>
          </div>
        </div>
        <div
          className={`${
            toggle === "edit" ? "userSettings_info" : "userSettings_info_close"
          }`}
        >
          <form
            onSubmit={(e) => {
              handleUserInfo(e);
            }}
            className="userSettings_form"
          >
            <div className="userSettings_form_name">
              <div className="userSettings_form_first_name">
                <label
                  className="userSettings_form_first_name_label"
                  htmlFor="firstname"
                >
                  Name
                </label>
                <input
                  required
                  className="userSettings_form_first_name_input"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
              </div>
            </div>
            <div className="userSettings_form_email">
              <label className="userSettings_form_email_label" htmlFor="email">
                Email address
              </label>
              <input
                required
                className="userSettings_form_email_input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
            </div>
            <button disabled={disable} className="userSettings_button">
              {disable ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
