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
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";

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
            <option value="Abia">Abia</option>
            <option value="Adamawa">Adamawa</option>
            <option value="AkwaIbom">AkwaIbom</option>
            <option value="Anambra">Anambra</option>
            <option value="Bauchi">Bauchi</option>
            <option value="Bayelsa">Bayelsa</option>
            <option value="Benue">Benue</option>
            <option value="Borno">Borno</option>
            <option value="Cross River">Cross River</option>
            <option value="Delta">Delta</option>
            <option value="Ebonyi">Ebonyi</option>
            <option value="Edo">Edo</option>
            <option value="Ekiti">Ekiti</option>
            <option value="Enugu">Enugu</option>
            <option value="FCT">FCT</option>
            <option value="Gombe">Gombe</option>
            <option value="Imo">Imo</option>
            <option value="Jigawa">Jigawa</option>
            <option value="Kaduna">Kaduna</option>
            <option value="Kano">Kano</option>
            <option value="Katsina">Katsina</option>
            <option value="Kebbi">Kebbi</option>
            <option value="Kogi">Kogi</option>
            <option value="Kwara">Kwara</option>
            <option value="Lagos">Lagos</option>
            <option value="Nasarawa">Nasarawa</option>
            <option value="Niger">Niger</option>
            <option value="Ogun">Ogun</option>
            <option value="Ondo">Ondo</option>
            <option value="Osun">Osun</option>
            <option value="Oyo">Oyo</option>
            <option value="Plateau">Plateau</option>
            <option value="Rivers">Rivers</option>
            <option value="Sokoto">Sokoto</option>
            <option value="Taraba">Taraba</option>
            <option value="Yobe">Yobe</option>
            <option value="Zamfara">Zamafara</option>
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
