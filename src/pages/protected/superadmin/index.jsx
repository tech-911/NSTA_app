import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./superadmin.scss";
import Sidenav from "../../../components/sidenav/Sidenav";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Index = () => {
  const [side, setSide] = useState(0);
  const { user } = useSelector((state) => state.login);

  return (
    <div className="superadmin_wrapper">
      <Sidenav side={side} setSide={setSide} />
      <div className={`superadmin_outlet ${side ? "blur-sm" : ""}`}>
        <div className="superadmin_nav border-b-[#df69513d] border-b-[1px]">
          <GiHamburgerMenu
            onClick={() => {
              setSide(!side);
            }}
            className="superadmin_hamburger"
          />
          <div className="superadmin_nav_text_wrap">
            <h1 className="superadmin_nav_text1">Welcome, {user.name}!</h1>
            {/* <p className="superadmin_nav_text2">Welcome back Admin</p> */}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
