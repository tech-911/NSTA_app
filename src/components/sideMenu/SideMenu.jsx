import React, { useEffect, useState } from "react";
import "./sideMenu.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const SideMenu = ({ link, name, icon, id }) => {
  const { user } = useSelector((state) => state.login);
  const location = useLocation();
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (user.role === "user") {
      if (location.pathname.includes("/user/booking")) {
        setActive(0);
      } else if (location.pathname === "/user") {
        setActive(0);
      } else if (location.pathname.includes("/user/transaction")) {
        setActive(1);
      } else if (location.pathname.includes("/user/history")) {
        setActive(2);
      } else if (location.pathname.includes("/user/settings")) {
        setActive(3);
      }
    } else if (user.role === "admin") {
      if (location.pathname.includes("/admin/dashboard")) {
        setActive(0);
      } else if (location.pathname === "/admin") {
        setActive(0);
      } else if (location.pathname.includes("/admin/history")) {
        setActive(1);
      } else if (location.pathname.includes("/admin/settings")) {
        setActive(2);
      }
    } else if (user.role === "super_admin") {
      if (location.pathname.includes("/superadmin/dashboard")) {
        setActive(0);
      } else if (location.pathname === "/superadmin") {
        setActive(0);
      } else if (location.pathname.includes("/superadmin/createadmin")) {
        setActive(1);
      } else if (location.pathname.includes("/superadmin/history")) {
        setActive(2);
      } else if (location.pathname.includes("/superadmin/settings")) {
        setActive(3);
      }
    }
  });
  return (
    <Link
      to={link}
      className={`sideop_link ${active === id ? "sideop_active" : ""}`}
    >
      <div
        className={`sideop_icon ${active === id ? "sideop_active_icon" : ""}`}
      >
        {icon}
      </div>
      <p className={`sideop_name ${active === id ? "sideop_active_text" : ""}`}>
        {name}
      </p>
    </Link>
  );
};

export default SideMenu;
