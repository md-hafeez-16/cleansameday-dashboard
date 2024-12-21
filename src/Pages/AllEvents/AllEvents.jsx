import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [id, setId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); 
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

  const fetchAllEvents = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/event/getAllEventsPagination?page=${page}&pageSize=10`);
      const fetchedEvents = res.data.events.map((event, index) => ({
        id: event.id,
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
      setTotalPages(res?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (id) => {
    setId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/event/deleteEvent/${id}`);
      fetchAllEvents();
      handleCloseDialog();
      toast.success("Event Deleted Successfully");
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
      render: (value) => (
        <div className="flex gap-2 justify-center items-center cursor-pointer">
          <FaRegEdit
            className="text-blue-500 hover:underline"
            size={16}
            onClick={() => navigate(`/editEvents/${value._id}`)}
          />
          <MdDelete
            className="text-red-500 hover:underline"
            size={16}
            onClick={() => handleOpenDialog(value._id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchAllEvents();
  }, []);

  if (isLoading) {
    return (
      <div className=" mt-40 flex justify-center items-center">
        <ClipLoader className="text-[#FDE7AA]" />
      </div>
    );
  }

  return (
    <>
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


      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-sm font-semibold mb-4">
              Are you sure you want to delete this event?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;

