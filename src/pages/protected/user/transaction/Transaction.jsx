import React, { useEffect, useState } from "react";
import Table from "../../../../components/table/Table";
import "./transaction.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import emptyTransaction from "../../../../assets/png/emptyTransaction.png";
const Transaction = () => {
  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.login);
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";

  useEffect(() => {
    // ================request for pending bookings=======================
    axios
      .post(
        `${baseUrl}/getIndividualUserRequest`,
        { status: "pending", user_id: user?._id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setPending(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // ================request for accepted bookings=======================
    axios
      .post(
        `${baseUrl}/getIndividualUserRequest`,
        { status: "accepted", user_id: user?._id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setAccepted(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // ================request for declined bookings=======================
    axios
      .post(
        `${baseUrl}/getIndividualUserRequest`,
        { status: "declined", user_id: user?._id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setRejected(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="transaction_head_title">View Transactions</h1>

      {pending.length !== 0 && (
        <div className="px-[2rem] mb-4">
          <Table data={pending} status="Pending" detailUrl="/user/details" />
        </div>
      )}
      {accepted.length !== 0 && (
        <div className="px-[2rem] mb-4">
          <Table data={accepted} status="Accepted" detailUrl="/user/details" />
        </div>
      )}
      {rejected.length !== 0 && (
        <div className="px-[2rem] mb-[10rem]">
          <Table data={rejected} status="Rejected" detailUrl="/user/details" />
        </div>
      )}
      {(pending.length === 0) &
      (accepted.length === 0) &
      (rejected.length === 0) ? (
        <div className="transaction_empty_wrapper flex flex-col items-center justify-center mt-[4rem]">
          <img src={emptyTransaction} alt="emptyTransaction" />
          <div className="transaction_empty_text flex flex-col items-center">
            <h1 className="transaction_empty_head text-center">
              No Transactions Available
            </h1>
            <p className="transaction_empty_text2">Create a Trip</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transaction;
