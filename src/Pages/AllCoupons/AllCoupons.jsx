import React from "react";
import CustTable from "../../Components/Table";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const columns = [
  { label: "Sl.no", accessor: "slno" },
  { label: "Event Name", accessor: "eventName" },
  { label: "Event Date", accessor: "eventDate" },
  { label: "Total Tickets", accessor: "totalTickets" },
  { label: "Tickets Sold", accessor: "ticketsSold" },
  { label: "Event Status", accessor: "eventStatus" },
  { label: "Sold Out Status", accessor: "soldOutStatus" },
  {
    label: "Actions",
    accessor: "actions",
    render: (value, row) => (
      <div className="flex gap-2 justify-center items-center cursor-pointer">
        <FaRegEdit className="text-blue-500 hover:underline" size={16}/>
        <MdDelete className="text-red-500 hover:underline" size={16}/>
      </div>
    ),
  },
];

const data = [
  {
    slno: 1,
    eventName: "Music Fest 2024",
    eventDate: "2024-05-01",
    totalTickets: 500,
    ticketsSold: 500,
    eventStatus: "Completed",
    soldOutStatus: "Sold Out",
  },
  {
    slno: 2,
    eventName: "Art Expo",
    eventDate: "2024-06-15",
    totalTickets: 300,
    ticketsSold: 150,
    eventStatus: "Upcoming",
    soldOutStatus: "Not Sold Out",
  },
  {
    slno: 3,
    eventName: "Tech Conference",
    eventDate: "2024-07-10",
    totalTickets: 1000,
    ticketsSold: 1000,
    eventStatus: "Completed",
    soldOutStatus: "Sold Out",
  },
];

const AllCoupons = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Events</h1>
      <CustTable
        columns={columns}
        data={data}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default AllCoupons;
