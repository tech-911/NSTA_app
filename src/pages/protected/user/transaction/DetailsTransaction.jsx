import React, { useState } from "react";
import "./transactionDetails.scss";
import { useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoTrashcan } from "react-icons/go";
import axios from "axios";
import Modal from "../../../../components/Modal/Modal";
import Transaction from "./Transaction";

const DetailsTransaction = () => {
  const [disable, setDisable] = useState(0);
  const [accept, setAccept] = useState(0);
  const [decline, setDecline] = useState(0);
  const [modal, setModal] = useState(0);
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
    // statusValue === "accepted" ? setAccept(1) : setAccept(0);
    // statusValue === "declined" ? setDecline(1) : setDecline(0);
    // setDisable(1);
    // setDisable(0);
    // setDecline(0);
    // setAccept(0);
  };
  const handleDelete = async () => {
    setDisable(1);
    try {
      await axios.request({
        url: `${baseUrl}/deletebooking`,
        method: "delete",
        headers: {
          "auth-token": token,
        },
        data: {
          _id: _id,
        },
      });
      setDisable(0);
      setModal(0);
      navigate("/user/transaction");
    } catch (err) {
      setDisable(0);
      setModal(0);
      toast.error(`Error: ${err.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="transactionDetail_wrapper">
      <ToastContainer />
      <Modal
        modal={modal}
        setModal={setModal}
        Header="Delete Booking"
        actionText="delete"
        actionMethod={handleDelete}
        text="delete this booking"
      />

      <div
        onClick={() => {
          navigate(-1);
        }}
        className="transactionDetail_back"
      >
        <div className="transactionDetail_back_icon">
          <TiArrowBack className="transactionDetail_back_icon1" />
        </div>
        <p className="transactionDetail_back_text">Back</p>
      </div>
      <div className="transactionDetail_widget">
        <button
          disabled={disable}
          onClick={() => {
            setModal(!modal);
          }}
          className="transactionDetail_delete"
        >
          <GoTrashcan className="transactionDetail_delete_icon" />
        </button>

        <div className="transactionDetail_name">
          <p className="transactionDetail_name_label">Name:</p>
          <p className="transactionDetail_name_value">{name}</p>
        </div>
        <div className="transactionDetail_email">
          <p className="transactionDetail_email_label">Email:</p>
          <p className="transactionDetail_email_value">{email}</p>
        </div>
        <div className="transactionDetail_date">
          <p className="transactionDetail_date_label">Date:</p>
          <p className="transactionDetail_date_value">{date.split("T")[0]}</p>
        </div>
        <div className="transactionDetail_time">
          <p className="transactionDetail_time_label">Time:</p>
          <p className="transactionDetail_time_value">{formatAMPM(date)}</p>
        </div>
        <div className="transactionDetail_status">
          <p className="transactionDetail_status_label">Status:</p>
          {status === "pending" && (
            <p className="text-[#eea13d] transactionDetail_status_value">
              {status}
            </p>
          )}
          {status === "declined" && (
            <p className="text-[#b93737] transactionDetail_status_value">
              {status}
            </p>
          )}
          {status === "accepted" && (
            <p className="text-[#32a542] transactionDetail_status_value">
              {status}
            </p>
          )}
          {status === "paid" && (
            <p className="text-[#714DD9] transactionDetail_status_value">
              {status}
            </p>
          )}
        </div>
        <div className="transactionDetail_no">
          <p className="transactionDetail_no_label">Numbers of Passangers:</p>
          <p className="transactionDetail_no_value">{passangers_number}</p>
        </div>
        <div className="transactionDetail_destination">
          <p className="transactionDetail_destination_label">Destination:</p>
          <p className="transactionDetail_destination_value">{destination}</p>
        </div>
        <div className="transactionDetail_car">
          <p className="transactionDetail_car_label">Car Type:</p>
          <p className="transactionDetail_car_value">{car_type}</p>
        </div>
        {status === "paid" && (
          <div>
            <div className="transactionDetail_car">
              <p className="transactionDetail_car_label">Payment Status:</p>
              <p className="transactionDetail_car_value">
                {value?.data?.transaction_id?.message}
              </p>
            </div>
            <div className="transactionDetail_car">
              <p className="transactionDetail_car_label">Reference:</p>
              <p className="transactionDetail_car_value">
                {value?.data?.transaction_id?.reference}
              </p>
            </div>
            <div className="transactionDetail_car">
              <p className="transactionDetail_car_label">Transaction Id:</p>
              <p className="transactionDetail_car_value">
                {value?.data?.transaction_id?.trans}
              </p>
            </div>
          </div>
        )}
        {status === "accepted" && (
          <div className="transactionDetail_button">
            <button
              onClick={() => {
                navigate(`/user/paystack`, {
                  state: { value },
                });
              }}
              className="transactionDetail_button2"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsTransaction;
