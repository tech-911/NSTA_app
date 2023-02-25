import React from "react";
import "./construction.scss";
import Nav from "../../components/nav/Nav";
import leftLanding from "../../assets/png/leftLanding.png";
import rightLanding from "../../assets/png/rightLanding.png";
import construction from "../../assets/png/error/commingSoon.png";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
const CommingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="construction_wrapper">
      <Nav />
      <img
        className="construction_leftLanding"
        src={leftLanding}
        alt="leftLandingImage"
      />
      <img
        className="construction_rightLanding"
        src={rightLanding}
        alt="rightLandingImage"
      />
      <div className="construction_body">
        <div className="construction_content">
          <img src={construction} alt="construction" />
          <div className="construction_text_wrap">
            <h1 className="construction_text1">COMMING SOON!</h1>
            <h1 className="construction_text2">
              THIS PAGE IS UNDER CONSTRUCTION.
            </h1>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="construction_text_button"
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommingSoon;
