import React from "react";
import img from "../../../assets/Images/party.jpg";

const StatCard = ({ sold, total, name }) => {
  return (
    <div className={`shadow-xl rounded-md px-4 py-3 text-center`}>
      <h2 className="text-primary font-bold text-3xl">{sold} {total>= 0 ? <span className="text-base"> / {total}</span> : ""}</h2>
      <h2 className="text-primary font-bold text-sm">{name}</h2>
    </div>
  );
};

export default StatCard;
