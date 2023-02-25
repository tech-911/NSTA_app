import React, { useState } from "react";
import "./table.scss";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Table = ({ data, status, detailUrl }) => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(0);
  const tablePending = status === "Pending" ? "table_pending" : "";
  const tableDeclined = status === "Rejected" ? "table_declined" : "";
  const tableAccepted = status === "Accepted" ? "table_accepted" : "";

  return (
    <div className="table_wrapper overflow-x-hidden">
      <div className="bg-white rounded-md table_widget relative overflow-x-hidden">
        {status === "Pending" && (
          <div className="mx-[2rem] my-7 h-[40px] flex flex-row items-center">
            <div
              onClick={() => {
                setDropDown(!dropDown);
              }}
              className="cursor-pointer border-[1px] border-[#714DD9] rounded-l-md flex flex-row items-center h-full"
            >
              {dropDown ? (
                <MdKeyboardArrowUp className="text-[2.5rem] text-[#714DD9]" />
              ) : (
                <MdKeyboardArrowDown className="text-[2.5rem] text-[#714DD9]" />
              )}
            </div>
            <div className="bg-[#714DD9] rounded-r-md h-full px-3 flex flex-row items-center">
              <p className="text-[white] text-[18px] font-[Poppins]">
                {status}
              </p>
            </div>
          </div>
        )}
        {status === "Accepted" && (
          <div className="mx-[2rem] my-7 h-[40px] flex flex-row items-center">
            <div
              onClick={() => {
                setDropDown(!dropDown);
              }}
              className="cursor-pointer border-[1px] border-[#52C41A] rounded-l-md flex flex-row items-center h-full"
            >
              {dropDown ? (
                <MdKeyboardArrowUp className="text-[2.5rem] text-[#52C41A]" />
              ) : (
                <MdKeyboardArrowDown className="text-[2.5rem] text-[#52C41A]" />
              )}
            </div>
            <div className="bg-[#52C41A] rounded-r-md h-full px-3 flex flex-row items-center">
              <p className="text-[white] text-[18px] font-[Poppins] ">
                {status}
              </p>
            </div>
          </div>
        )}
        {status === "Rejected" && (
          <div className="mx-[2rem] my-7 h-[40px] flex flex-row items-center">
            <div
              onClick={() => {
                setDropDown(!dropDown);
              }}
              className="cursor-pointer border-[1px] border-[red] rounded-l-md flex flex-row items-center h-full"
            >
              {dropDown ? (
                <MdKeyboardArrowUp className="text-[2.5rem] text-[red]" />
              ) : (
                <MdKeyboardArrowDown className="text-[2.5rem] text-[red]" />
              )}
            </div>
            <div className="bg-[red] rounded-r-md h-full px-3 flex flex-row items-center">
              <p className="text-[white] text-[18px] font-[Poppins] ">
                {status}
              </p>
            </div>
          </div>
        )}
        {status === "Paid" && (
          <div className="mx-[2rem] my-7 h-[40px] flex flex-row items-center">
            <div
              onClick={() => {
                setDropDown(!dropDown);
              }}
              className="cursor-pointer border-[1px] border-[#eea13d] rounded-l-md flex flex-row items-center h-full"
            >
              {dropDown ? (
                <MdKeyboardArrowUp className="text-[2.5rem] text-[#eea13d]" />
              ) : (
                <MdKeyboardArrowDown className="text-[2.5rem] text-[#eea13d]" />
              )}
            </div>
            <div className="bg-[#eea13d] rounded-r-md h-full px-3 flex flex-row items-center">
              <p className="text-[white] text-[18px] font-[Poppins] ">
                {status}
              </p>
            </div>
          </div>
        )}

        <div
          className={`table_table mx-[2rem] overflow-x-scroll transition-all duration-[500ms] ease-in-out 
          ${dropDown ? "mb-10" : "h-0 mb-0"}`}
        >
          <div className="grid gap-3 pb-4 table_title border-b-2 border-[#6c99c411]">
            <p className="text-[black] text-[16px] font-[inter] font-bold justify-self-start col-span-3 ml-4">
              Name
            </p>
            <p className="text-[black] text-[16px] font-[inter] font-bold col-span-3">
              Status
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
          <div className="table_content">
            {data?.map((value, id) => {
              return (
                <div
                  onClick={() => {
                    navigate(`${detailUrl}`, {
                      state: { value, id },
                    });
                  }}
                  key={id}
                  className={`cursor-pointer grid gap-3 pt-4 table_item1 ${tableAccepted} ${tableDeclined} ${tablePending} border-b-2 border-[#6c99c411] pb-4`}
                >
                  <p className="justify-self-start text-[#7e7d7d] col-span-3 ml-4">
                    {value.name}
                  </p>
                  <p className="col-span-3 text-[#7e7d7d]">{value.status}</p>
                  <p className="col-span-2 text-[#7e7d7d]">{value.car_type}</p>
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
    </div>
  );
};

export default Table;
