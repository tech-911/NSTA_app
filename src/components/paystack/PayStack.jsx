import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./paystack.scss";

const Paystack = () => {
  const publicKey = "pk_test_80758e75a7c32aaf5e4cd95642cb90806270e67a";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const { token } = useSelector((state) => state.login);
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";
  const { state } = useLocation();
  const { value } = state;
  const { _id } = value;
  const navigate = useNavigate();
  const onSuccess = (reference) => {
    axios
      .put(
        `${baseUrl}/updatebookstatus`,
        { _id: _id, status: "paid" },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        return axios.put(
          `${baseUrl}/savetransactionid`,
          { _id: _id, prevObj: {}, transaction_id: reference },
          {
            headers: { "auth-token": token },
          }
        );
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("/user/transaction");
  };

  const onClose = () => {
    toast.info(`Payment closed`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const paystackProps = {
    email,
    amount: amount * 100,
    publicKey,
    metadata: {
      name,
    },
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  return (
    <div className="paystack_wrapper">
      <ToastContainer />
      <div className="paystack_form">
        <h1 className="paystack_form_heading">Paystack Form</h1>
        <div className="paystack_name">
          <label htmlFor="name" className="paystack_name_label">
            Name:
          </label>
          <input
            id="name"
            className="paystack_name_input"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="paystack_email">
          <label htmlFor="email" className="paystack_email_label">
            Email:
          </label>
          <input
            id="email"
            className="paystack_email_input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="paystack_amount">
          <label htmlFor="amount" className="paystack_amount_label">
            Amount:
          </label>

          <input
            id="amount"
            className="paystack_amount_input"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <PaystackButton className="paystack_button" {...paystackProps} />
      </div>
    </div>
  );
};

export default Paystack;
