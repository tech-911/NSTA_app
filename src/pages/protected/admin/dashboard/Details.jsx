import React, { useState } from "react";
import "./detials.scss";
import { useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Details = () => {
  const [disable, setDisable] = useState(0);
  const [accept, setAccept] = useState(0);
  const [decline, setDecline] = useState(0);
  const { state } = useLocation();
  const { value, id } = state;
  const navigate = useNavigate();
  const {
    car_type,
    date,
    destination,
    email,
    name,
    passangers_number,
    _id,
    status,
  } = value;
  const { token } = useSelector((state) => state.login);
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";
  const formatAMPM = (date) => {
    // date = new Date(date);
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? "pm" : "am";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    // var strTime = hours + ":" + minutes + " " + ampm;
    // return strTime;
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours - 1 + ":" + minutes + " " + ampm;
    return strTime;
  };
  const handleStatus = async (statusValue) => {
    statusValue === "accepted" ? setAccept(1) : setAccept(0);
    statusValue === "declined" ? setDecline(1) : setDecline(0);
    setDisable(1);
    try {
      await axios.put(
        `${baseUrl}/updatebookstatus`,
        { _id: _id, status: statusValue },
        {
          headers: { "auth-token": token },
        }
      );
      setDisable(0);
      setDecline(0);
      setAccept(0);
      toast.success(`Trip ${statusValue}`, {
        position: toast.POSITION.TOP_RIGHT,
      });

      navigate("/superadmin/dashboard");
    } catch (err) {
      setDisable(0);
      setDecline(0);
      setAccept(0);
      toast.error(`Error: ${err.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setDisable(0);
    setDecline(0);
    setAccept(0);
  };

  return (
    <div className="detail_wrapper">
      <ToastContainer />
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="detail_back"
      >
        <div className="detail_back_icon">
          <TiArrowBack className="detail_back_icon1" />
        </div>
        <p className="detial_back_text">Back</p>
      </div>
      <div className="detial_widget">
        <div className="detial_name">
          <p className="detial_name_label">Name:</p>
          <p className="detial_name_value">{name}</p>
        </div>
        <div className="detial_email">
          <p className="detial_email_label">Email:</p>
          <p className="detial_email_value">{email}</p>
        </div>
        <div className="detial_date">
          <p className="detial_date_label">Date:</p>
          <p className="detial_date_value">{date.split("T")[0]}</p>
        </div>
        <div className="detial_time">
          <p className="detial_time_label">Time:</p>
          <p className="detial_time_value">{formatAMPM(date)}</p>
        </div>
        <div className="detial_status">
          <p className="detial_status_label">Status:</p>
          {status === "pending" && (
            <p className="text-[#eea13d] detial_status_value">{status}</p>
          )}
          {status === "declined" && (
            <p className="text-[#b93737] detial_status_value">{status}</p>
          )}
          {status === "accepted" && (
            <p className="text-[#32a542] detial_status_value">{status}</p>
          )}
          {status === "paid" && (
            <p className="text-[purple] detial_status_value">{status}</p>
          )}
        </div>
        <div className="detial_no">
          <p className="detial_no_label">Numbers of Passangers:</p>
          <p className="detial_no_value">{passangers_number}</p>
        </div>
        <div className="detial_destination">
          <p className="detial_destination_label">Destination:</p>
          <p className="detial_destination_value">{destination}</p>
        </div>
        <div className="detial_car">
          <p className="detial_car_label">Car Type:</p>
          <p className="detial_car_value">{car_type}</p>
        </div>
        {status === "paid" && (
          <div>
            <div className="detial_car">
              <p className="detial_car_label">Payment Status:</p>
              <p className="detial_car_value text-[#4bb64b]">
                {value?.data?.transaction_id?.message}
              </p>
            </div>
            <div className="detial_car">
              <p className="detial_car_label">Reference:</p>
              <p className="detial_car_value">
                {value?.data?.transaction_id?.reference}
              </p>
            </div>
            <div className="detial_car">
              <p className="detial_car_label">Transaction Id:</p>
              <p className="detial_car_value text-[#4bb64b]">
                {value?.data?.transaction_id?.trans}
              </p>
            </div>
          </div>
        )}
        {status === "pending" && (
          <div className="detail_button">
            <button
              disabled={disable}
              onClick={() => {
                handleStatus("accepted");
              }}
              className="detail_button1"
            >
              {accept ? "Accepting..." : "Accept"}
            </button>
            <button
              disabled={disable}
              onClick={() => {
                handleStatus("declined");
              }}
              className="detail_button2"
            >
              {decline ? "Declining..." : "Decline"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
