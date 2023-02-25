import React from "react";
import spin from "../../assets/svg/spin.svg";
import "./preloader.scss";
const Preloader = () => {
  return (
    <div className="preloader_wrapper">
      <img src={spin} alt="spin" />
    </div>
  );
};

export default Preloader;
