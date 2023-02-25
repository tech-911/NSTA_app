import React from "react";
import footer_design from "../../assets/png/footer_design.png";
import logo from "../../assets/png/footerLogo.png";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer_wrapper">
      <img className="footer_design" src={footer_design} alt="footer_desgin" />
      <div className="footer_container">
        <div className="footer_item_wrap">
          <div className="footer_logo_wrap">
            <img className="footer_logo" src={logo} alt="logo" />
            <p className="footer_logo_text">
              Book your trip in minute, get full Control for much longer.
            </p>
          </div>
          <div className="footer_rightContent">
            <ul className="footer_items1_wrap">
              <li className="footer_item1">Company</li>
              <li className="footer_item2">About</li>
              <li className="footer_item3">Carrers</li>
              <li className="footer_item4">Mobile</li>
            </ul>
            <ul className="footer_items2_wrap">
              <li className="footer_item1">Contact</li>
              <li className="footer_item2">Help/FAQ</li>
              <li className="footer_item3">Press</li>
              <li className="footer_item4">Affilates</li>
            </ul>
            <ul className="footer_items3_wrap">
              <li className="footer_item1">More</li>
              <li className="footer_item2">Airlines</li>
              <li className="footer_item3">Train station</li>
              <li className="footer_item4">Bus station</li>
            </ul>
          </div>
        </div>
        <p className="footer_copyright">All rights reserved@ticketxpress.com</p>
      </div>
    </div>
  );
};

export default Footer;
