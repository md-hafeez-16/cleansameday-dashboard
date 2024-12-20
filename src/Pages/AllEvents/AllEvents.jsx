import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";

const columns = [
  { label: "Sl.no", accessor: "slno" },
  { label: "Event Name", accessor: "eventName" },
  { label: "Event Date", accessor: "eventDate" },
  { label: "Total Tickets", accessor: "totalTickets" },
  { label: "Tickets Sold", accessor: "ticketsSold" },
  { label: "celebrity", accessor: "celebrity" },
  { label: "Time", accessor: "Time" },
  { label: "Venue", accessor: "Venue" },
  // { label: "Sold Out Status", accessor: "soldOutStatus" },
  {
    label: "Actions",
    accessor: "actions",
    render: (value, row) => (
      <div className="flex gap-2 justify-center items-center cursor-pointer">
        <FaRegEdit className="text-blue-500 hover:underline" size={16} />
        <MdDelete className="text-red-500 hover:underline" size={16} />
      </div>
    ),
  },
];

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/event/getAllEventsPagination`);
      const fetchedEvents = res.data.events.map((event, index) => ({
        slno: index + 1,
        eventName: event.name,
        eventDate: new Date(event.date).toISOString().split("T")[0], // Format as 'yyyy-mm-dd'
        totalTickets: event.totalTickets,
        ticketsSold: event.ticketSold,
        Time: event.time,
        celebrity: event.celebrity,
        Venue: event.venue,
        // soldOutStatus: event.totalTickets === event.ticketSold ? "Sold Out" : "Not Sold Out",
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Events</h1>
      <CustTable
        columns={columns}
        data={events}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default AllEvents;
