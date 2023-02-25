import React from "react";
import "./widget.scss";

const Widget = ({ img, text1, text2 }) => {
  return (
    <div className="widget_wrapper">
      <img className="widget_img" src={img} alt="widgetImg" />
      <h1 className="widget_text1">{text1}</h1>
      <p className="widget_text2">{text2}</p>
    </div>
  );
};

export default Widget;
