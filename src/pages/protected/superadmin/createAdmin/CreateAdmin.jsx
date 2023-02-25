import React, { useState } from "react";
import "./createAdmin.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const CreateAdmin = () => {
  //---------------Hooks------------------------
  const [disable, setDisable] = useState(0);
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { token } = useSelector((state) => state.login);

  //---------------Variables------------------------
  // const baseUrl = "http://localhost:4000/api/user";
  const baseUrl = "https://ticketappbackend.vercel.app/api/user";

  //---------------methods------------------------
  const handleSubmit = async (e) => {
    setDisable(1);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}/admin_register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "admin",
        },
        { headers: { "auth-token": token } }
      );
      toast.success("New Admin Created", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(`Error: ${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setDisable(0);
    }
    setData({
      name: "",
      email: "",
      password: "",
    });

    setDisable(0);
  };

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  let { name, email, password } = data;

  //---------------Main Retrun------------------------

  return (
    <div className="createadmin_wrapper">
      <ToastContainer />
      <h1 className="superadmincreate_head_title">Create an Admin</h1>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="createadmin_form"
      >
        <div className="createadmin_name">
          <label htmlFor="name" className="createadmin_name_label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="createadmin_name_input"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="createadmin_email">
          <label htmlFor="email" className="createadmin_email_label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="createadmin_email_input"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="createadmin_password">
          <label htmlFor="password" className="createadmin_password_label">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="createadmin_password_input"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>

        <button disabled={disable} className="createadmin_submit">
          {disable ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
