import React, { useState } from "react";
import { Label } from "recharts";
import "./booking.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Booking = () => {
  //---------------Hooks------------------------
  const [disable, setDisable] = useState(0);
  let [data, setData] = useState({
    name: "",
    email: "",
    destination: "",
    passangers_number: 0,
    time: "",
    date: "",
    car_type: "",
  });
  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.login);
  const { _id } = user;

  //---------------Variables------------------------
  const baseUrl = "https://nsta-be.vercel.app/api/useraction";

  //---------------methods------------------------
  const handleSubmit = async (e) => {
    setDisable(1);
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}/bookings`,
        {
          name: data.name,
          email: data.email,
          destination: data.destination,
          passangers_number: Number(data.passangers_number),
          time: data.time,
          date: `${data.date}T${data.time}`,
          car_type: data.car_type,
          user_id: _id,
        },
        { headers: { "auth-token": token } }
      );
      toast.success("Trip Created", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(`Error: ${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setDisable(0);
    }
    setData({
      name: "",
      email: "",
      destination: "",
      passangers_number: 0,
      time: "",
      date: "",
      car_type: "",
    });

    setDisable(0);
  };

  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  let { name, email, destination, passangers_number, time, date, car_type } =
    data;

  //---------------Main Retrun------------------------

  return (
    <div className="booking_wrapper">
      <ToastContainer />
      <h1 className="booking_head_title">Create Booking</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="booking_form"
      >
        <div className="booking_name">
          <label htmlFor="name" className="booking_name_label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="booking_name_input"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="booking_email">
          <label htmlFor="email" className="booking_email_label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="booking_email_input"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="booking_destination">
          <label htmlFor="destination" className="booking_destination_label">
            Destination:
          </label>
          {/* <input
            id="destination"
            type="text"
            className="booking_destination_input"
            placeholder="Enter Destination"
          /> */}
          <select
            name="destination"
            id="destination"
            className="booking_destination_input"
            required
            value={destination}
            onChange={(e) => {
              handleInput(e);
            }}
          >
            <option className="placeholder" value="" defaultValue={true}>
              Select Destination
            </option>
            <option value="Abia - ₦5000">Abia - ₦5000</option>
            <option value="Adamawa - ₦5000">Adamawa - ₦5000</option>
            <option value="AkwaIbom - ₦5000">AkwaIbom - ₦5000</option>
            <option value="Anambra - ₦5000">Anambra - ₦5000</option>
            <option value="Bauchi - ₦4500">Bauchi - ₦4500</option>
            <option value="Bayelsa - ₦5000">Bayelsa - ₦5000</option>
            <option value="Benue - ₦5000">Benue - ₦5000</option>
            <option value="Borno - ₦5000">Borno - ₦5000</option>
            <option value="Cross River - ₦5000">Cross River - ₦5000</option>
            <option value="Delta - ₦5000">Delta - ₦5000</option>
            <option value="Ebonyi - ₦5000">Ebonyi - ₦5000</option>
            <option value="Edo - ₦5000">Edo - ₦5000</option>
            <option value="Ekiti - ₦5000">Ekiti - ₦5000</option>
            <option value="Enugu - ₦5000">Enugu - ₦5000</option>
            <option value="FCT - ₦2500">FCT - ₦2500</option>
            <option value="Gombe - ₦6000">Gombe - ₦6000</option>
            <option value="Imo - ₦5000">Imo - ₦5000</option>
            <option value="Jigawa - ₦5000">Jigawa - ₦5000</option>
            <option value="Kaduna - ₦5000">Kaduna - ₦5000</option>
            <option value="Kano - ₦4500">Kano - ₦4500</option>
            <option value="Katsina - ₦5000">Katsina - ₦5000</option>
            <option value="Kebbi - ₦5000">Kebbi - ₦5000</option>
            <option value="Kogi - ₦4000">Kogi - ₦4000</option>
            <option value="Kwara - ₦5000">Kwara - ₦5000</option>
            <option value="Lagos - ₦7000">Lagos - ₦7000</option>
            <option value="Nasarawa - ₦5000">Nasarawa - ₦5000</option>
            <option value="Niger - ₦5000">Niger - ₦5000</option>
            <option value="Ogun - ₦5000">Ogun - ₦5000</option>
            <option value="Ondo - ₦5000">Ondo - ₦5000</option>
            <option value="Osun - ₦5000">Osun - ₦5000</option>
            <option value="Oyo - ₦5000">Oyo - ₦5000</option>
            <option value="Plateau - ₦5000">Plateau - ₦5000</option>
            <option value="Rivers - ₦5000">Rivers - ₦5000</option>
            <option value="Sokoto - ₦5000">Sokoto - ₦5000</option>
            <option value="Taraba - ₦5000">Taraba - ₦5000</option>
            <option value="Yobe - ₦5000">Yobe - ₦5000</option>
            <option value="Zamfara - ₦4500">Zamfara - ₦4500</option>
          </select>
        </div>
        <div className="booking_no">
          <label htmlFor="passangers_number" className="booking_no_label">
            No of Passangers:
          </label>
          <input
            placeholder="Enter number of passangers"
            id="passangers_number"
            type="number"
            min="1"
            className="booking_no_input"
            required
            value={passangers_number}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <div className="booking_more_wrapper">
          <div className="booking_time">
            <label htmlFor="time" className="booking_time_label">
              Time:
            </label>
            <input
              id="time"
              type="time"
              className="booking_time_input"
              required
              value={time}
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </div>
          <div className="booking_date">
            <label htmlFor="date" className="booking_date_label">
              Date:
            </label>
            <input
              id="date"
              type="date"
              className="booking_date_input"
              required
              value={date}
              onChange={(e) => {
                handleInput(e);
              }}
            />
          </div>
          <div className="booking_car">
            <label htmlFor="car_type" className="booking_car_label">
              Car Type:
            </label>
            <select
              name="car_type"
              id="car_type"
              className="booking_car_input"
              required
              value={car_type}
              onChange={(e) => {
                handleInput(e);
              }}
            >
              <option className="placeholder" value="" defaultValue={true}>
                Select Cartype
              </option>
              <option value="Bus">Bus</option>
              <option value="Sedan">Sedan</option>
              <option value="Mini van">Mini van</option>
              <option value="Seanna">Seanna</option>
            </select>
          </div>
        </div>
        <button disabled={disable} className="booking_submit">
          {disable ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
