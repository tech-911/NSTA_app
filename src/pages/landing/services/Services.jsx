import React from "react";
import "./services.scss";
import Widget from "../../../components/widget/Widget";
import { serviceData } from "./data";
import serviceDesign from "../../../assets/png/service/service_design.png";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="services_wrapper">
      <img className="service_design" src={serviceDesign} alt="service" />
      <div className="services_header">
        <p className="services_text1">OUR SERVICES</p>
        <h1 className="services_text2">We Offer Best Services</h1>
      </div>
      <div className="services_widget">
        {serviceData.map(({ id, img, text1, text2 }) => {
          return (
            <Link to="/login">
              <Widget key={id} img={img} text1={text1} text2={text2} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
