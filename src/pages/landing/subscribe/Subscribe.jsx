import React from "react";
import "./subscribe.scss";
import leftSpiral from "../../../assets/png/subscribe/leftspiral.png";
import rightSpiral from "../../../assets/png/subscribe/rightspiral.png";
import { HiOutlineMail } from "react-icons/hi";
const Subscribe = () => {
  return (
    <div className="subscribe_wrapper">
      <img className="subscribe_leftspiral" src={leftSpiral} alt="leftspiral" />
      <img
        className="subscribe_rightspiral"
        src={rightSpiral}
        alt="rightspiral"
      />
      <h1 className="subscribe_header">
        Subscribe to get information, latest news and other interesting offers
        about Ticket Xpress
      </h1>
      <div className="subscribe_input_wrap">
        <div className="subscribe_input_content">
          <HiOutlineMail className="subscribe_input_icon" />{" "}
          <input
            className="subscribe_input"
            placeholder="Your email"
            type="email"
          />
        </div>
        <button className="subscribe_input_button">Subscribe</button>
      </div>
    </div>
  );
};

export default Subscribe;
