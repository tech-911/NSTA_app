import React, { useState, useEffect } from "react";
import "./history.scss";
import axios from "axios";
import Table from "../../../../components/table/Table";
import { useSelector } from "react-redux";
import emptyHistory from "../../../../assets/png/emptyHistory.png";
const History = () => {
  const { token } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.login);
  const [paid, setPaid] = useState([]);
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";

  useEffect(() => {
    // ================request for paid bookings=======================
    axios
      .post(
        `${baseUrl}/getIndividualUserRequest`,
        { status: "paid", user_id: user?._id },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setPaid(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="user_history_wrapper">
      <h1 className="userhistory_head_title">User Transaction History</h1>

      {paid.length !== 0 && (
        <div className="px-[2rem] mb-4">
          {" "}
          <Table data={paid} status="Paid" detailUrl="/user/details" />
        </div>
      )}

      {paid.length === 0 && (
        <div className="user_history_empty_wrapper flex flex-col items-center justify-center mt-[4rem]">
          <img src={emptyHistory} alt="empty_user_history" />
          <div className="user_history_empty_text flex flex-col items-center mt-8">
            <h1 className="user_history_empty_head text-center">
              No History Available
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
