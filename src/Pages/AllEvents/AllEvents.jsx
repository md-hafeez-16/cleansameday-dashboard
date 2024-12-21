import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const[ id,setId]=useState(null)
  const navigate = useNavigate();

  

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/event/getAllEventsPagination`);
      const fetchedEvents = res.data.events.map((event, index) => ({
        id: event.id, // Include ID here
        slno: index + 1,
        eventName: event.name,
        eventDate: new Date(event.date).toISOString().split("T")[0],
        totalTickets: event.totalTickets,
        ticketsSold: event.ticketSold,
        Time: event.time,
        celebrity: event.celebrity,
        Venue: event.venue,
        actions: event,
      }));
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  const handleDelete = async (event) => {
    console.log(event);
    try {
      await axios.delete(`${BASE_URL}/event/deleteEvent/${event}`);
      fetchAllEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };


  const columns = [
    { label: "Sl.no", accessor: "slno" },
    { label: "Event Name", accessor: "eventName" },
    { label: "Event Date", accessor: "eventDate" },
    { label: "Total Tickets", accessor: "totalTickets" },
    { label: "Tickets Sold", accessor: "ticketsSold" },
    { label: "Celebrity", accessor: "celebrity" },
    { label: "Time", accessor: "Time" },
    { label: "Venue", accessor: "Venue" },
    {
      label: "Actions",
      accessor: "actions",
      render: (value, row) => (
        <div className="flex gap-2 justify-center items-center cursor-pointer">
          {/* Edit Action */}
          <FaRegEdit
            className="text-blue-500 hover:underline"
            size={16}
            onClick={() => navigate(`/editEvents/${value._id}`)}
          />
          {/* Delete Action */}
          <MdDelete
            className="text-red-500 hover:underline"
            size={16}
            onClick={() => handleDelete(value._id)}
          />
        </div>
      ),
    },
  ];

 

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Events</h1>
      {events?.length > 0 ? (
        <CustTable
          columns={columns}
          data={events}
          className="shadow-lg rounded-lg"
        />
      ) : (
        <h1 className="mb-4 text-primary">No events found</h1>
      )}
    </div>
  );
};

export default AllEvents;
