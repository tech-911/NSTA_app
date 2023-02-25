import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./admin.scss";
import Sidenav from "../../../components/sidenav/Sidenav";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Index = () => {
  const [side, setSide] = useState(0);
  const { user } = useSelector((state) => state.login);

  return (
    <div className="admin_wrapper">
      <Sidenav side={side} setSide={setSide} />
      <div className={`admin_outlet ${side ? "blur-sm" : ""}`}>
        <div className="admin_nav border-b-[#df69513d] border-b-[1px]">
          <GiHamburgerMenu
            onClick={() => {
              setSide(!side);
            }}
            className="admin_hamburger"
          />
          <div className="admin_nav_text_wrap">
            <h1 className="admin_nav_text1">Welcome, {user.name}!</h1>
            {/* <p className="admin_nav_text2">
              Welcome back Admin
            </p> */}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
