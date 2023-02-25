import React from "react";
import "./notfound.scss";
import Nav from "../../components/nav/Nav";
import leftLanding from "../../assets/png/leftLanding.png";
import rightLanding from "../../assets/png/rightLanding.png";
import error from "../../assets/png/error/error.png";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="error_wrapper">
      <Nav />
      <img
        className="error_leftLanding"
        src={leftLanding}
        alt="leftLandingImage"
      />
      <img
        className="error_rightLanding"
        src={rightLanding}
        alt="rightLandingImage"
      />
      <div className="error_body">
        <div className="error_content">
          <img src={error} alt="error" />
          <div className="error_text_wrap">
            <h1 className="error_text1">oops!</h1>
            <h1 className="error_text2">404 Page Not Found</h1>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="error_text_button"
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

export default PageNotFound;
