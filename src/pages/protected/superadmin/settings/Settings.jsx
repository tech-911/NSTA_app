import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookingsAction } from "../../../../redux/actionCreators/bookings/bookingsAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import emptyimg from "../../../../assets/png/empty.png";
import "./settings.scss";
const Settings = () => {
  const { token } = useSelector((state) => state.login);
  const baseUrl = "https://nsta-be.vercel.app/api/user";

  const [data, setData] = useState(null);
  const [empty, setEmpty] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${baseUrl}/getadminlist`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        setData(res?.data);
        setEmpty(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="superadminsetting_wrapper">
      <h1 className="superadminsetting_head_title">Admin Settings</h1>
      {empty?.length ? (
        <div className="bg-white rounded-md logs_widget relative overflow-x-hidden mb-[5rem]">
          <p className="text-[#02aae2] text-[25px] font-[inter] font-bold my-10 text-center logs_header_text_shadow">
            List of admins
          </p>
          <div className="logs_table mx-16 mb-20 overflow-x-scroll">
            <div className="grid gap-3 pb-8 logs_title border-b-2 border-[#6c99c411]">
              <p className="text-[black] ml-2  text-[16px] font-[inter] font-bold justify-self-start col-span-2">
                Name
              </p>
              <p className="text-[black] justify-self-start text-[16px] font-[inter] font-bold col-span-3">
                Email
              </p>
            </div>
            <div className="logs_content">
              {data?.map((value, id) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/superadmin/settingsdetails`, {
                        state: { value, id },
                      });
                    }}
                    key={id}
                    className="cursor-pointer grid gap-3 pt-4 logs_item1 border-b-2 border-[#6c99c411] pb-4"
                  >
                    <p className=" ml-2 justify-self-start text-[#7e7d7d] col-span-2">
                      {value.name}
                    </p>
                    <p className="justify-self-start col-span-3 text-[#7e7d7d]">
                      {value.email}
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

export default Settings;
