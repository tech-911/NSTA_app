import React, { useEffect, useState } from "react";
import "./dashboard.scss";
import { useSelector, useDispatch } from "react-redux";
import { bookingsAction } from "../../../../redux/actionCreators/bookings/bookingsAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emptyimg from "../../../../assets/png/empty.png";

const Dashboard = () => {
  const { token } = useSelector((state) => state.login);
  const baseUrl = "https://ticketappbackend.vercel.app/api/useraction";
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [empty, setEmpty] = useState(null);
  const [accepted, setAccepted] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [requests, setRequests] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/getpendingbookings`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        dispatch(bookingsAction(res?.data));
        setData(res?.data);
        setEmpty(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/acceptedrequestnumber`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setAccepted(res?.data?.count);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post(
        `${baseUrl}/getusernumber`,
        { user_type: "admin" },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        setAdmins(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/getuserrequest`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setRequests(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="logs_wrapper overflow-x-hidden p-[2rem]">
      <h1 className="superadmindashboard_head_title">Super Admin Dashboard</h1>

      <div className="dashboard_HUD">
        <div className="dashboard_HUD_item1">
          <p className="dashboard_HUD_item1_text">Total Admin</p>
          <h1 className="dashboard_HUD_item1_no">{admins}</h1>
        </div>
        <div className="dashboard_HUD_item2">
          <p className="dashboard_HUD_item2_text">Accepted</p>
          <h1 className="dashboard_HUD_item2_no">{accepted}</h1>
        </div>
        <div className="dashboard_HUD_item3">
          <p className="dashboard_HUD_item3_text">Total Request</p>
          <h1 className="dashboard_HUD_item3_no">{requests}</h1>
        </div>
      </div>

      {empty?.length ? (
        <div className="bg-white rounded-md logs_widget relative overflow-x-hidden mb-[5rem]">
          <p className="text-[#df6951] text-[25px] font-[inter] font-bold my-10 text-center logs_header_text_shadow">
            User Bookings Logs
          </p>
          <div className="logs_table mx-16 mb-20 overflow-x-scroll">
            <div className="grid gap-3 pb-8 logs_title border-b-2 border-[#6c99c411]">
              <p className="text-[black] text-[16px] font-[inter] font-bold justify-self-start col-span-3">
                Name
              </p>
              <p className="text-[black] text-[16px] font-[inter] font-bold col-span-3">
                Time
              </p>

              <p className="text-[black] text-[16px] font-[inter] font-bold col-span-2">
                Car Type
              </p>
              <p className="text-[black] text-[16px] font-[inter] font-bold col-span-1">
                Passangers
              </p>
              <p className="text-[black] text-[16px] font-[inter] font-bold col-span-2">
                Destination
              </p>
            </div>
            <div className="logs_content">
              {data?.map((value, id) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/superadmin/details`, {
                        state: { value, id },
                      });
                    }}
                    key={id}
                    className="cursor-pointer grid gap-3 pt-4 logs_item1 border-b-2 border-[#6c99c411] pb-4"
                  >
                    <p className="justify-self-start text-[#7e7d7d] col-span-3">
                      {value.name}
                    </p>
                    <p className="col-span-3 text-[#7e7d7d]">{value.date}</p>
                    <p className="col-span-2 text-[#7e7d7d]">
                      {value.car_type}
                    </p>
                    <p className="col-span-1 text-[#7e7d7d]">
                      {value.passangers_number}
                    </p>
                    <p className="col-span-2 text-[#7e7d7d]">
                      {value.destination}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="logs_empty_wrapper">
          <img src={emptyimg} alt="empty" className="logs_empty" />
          <h1 className="logs_empty_text">No Bookings Available</h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
