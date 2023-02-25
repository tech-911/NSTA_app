import React, { useState } from "react";
import "./sidenav.scss";
import logo from "../../assets/png/sidenavLogo.png";
import SideMenu from "../sideMenu/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import { userSideData } from "../../pages/protected/user/userSideData";
import { adminSideData } from "../../pages/protected/admin/adminSideData";
import { superAdminSideData } from "../../pages/protected/superadmin/superAdminSideData";
import { MdOutlineLogout, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actionCreators/login/loginAction";
import { bookingsAction } from "../../redux/actionCreators/bookings/bookingsAction";
import DeleteModal from "../Modal/Modal";

const Sidenav = ({ side, setSide }) => {
  const { user } = useSelector((state) => state.login);
  const [modal, setModal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(loginAction(null));
    dispatch(bookingsAction(null));
    navigate("/login");
  };
  return (
    <div className={`sidenav_wrapper ${side ? "sidenav_open" : ""}`}>
      <DeleteModal
        modal={modal}
        Header={"Logout"}
        text={"logout"}
        actionText={"logout"}
        setModal={setModal}
        actionMethod={handleLogout}
      />
      <MdClose
        onClick={() => {
          setSide(0);
        }}
        className="sidenav_close_button"
      />
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="sidenav_options">
        {user.role === "user" &&
          userSideData.map(({ icon, name, link, id }) => {
            return (
              <SideMenu key={id} icon={icon} name={name} link={link} id={id} />
            );
          })}
        {user.role === "admin" &&
          adminSideData.map(({ icon, name, link, id }) => {
            return (
              <SideMenu key={id} icon={icon} name={name} link={link} id={id} />
            );
          })}
        {user.role === "super_admin" &&
          superAdminSideData.map(({ icon, name, link, id }) => {
            return (
              <SideMenu key={id} icon={icon} name={name} link={link} id={id} />
            );
          })}
      </div>
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className={`sidenav_logout ${side ? "sidenav_logout_set" : ""}`}
      >
        <MdOutlineLogout className="sidenav_logout_icon" />
        <p className="sidenav_logout_text">Log Out</p>
      </div>
    </div>
  );
};

export default Sidenav;
