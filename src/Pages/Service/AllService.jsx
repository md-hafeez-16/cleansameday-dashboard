import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import { ClipLoader } from "react-spinners";
import { BASE_URL, formatDate } from "../../constants";
import toast from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { PencilOff, Trash2 } from "lucide-react";

const AllService = () => {
  const [allBooking, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState(null);

  const fetchBookings = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/service/getAllServices?page=${page}&pageSize=${pageSize}`
      );

      if (data?.serviceDoc) {
        setAllBookings(data.serviceDoc);
        setTotalItems(data.pagination?.totalDocuments || 0);
      } else {
        setError("No Service data received");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch bookings");
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (serviceId) => {
    console.log("Editing Service with ID:", serviceId);
    navigate(`/editservice/${serviceId}`);
  };

  const handleDeleteClick = (serviceId) => {
    setServiceIdToDelete(serviceId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (serviceIdToDelete) {
      try {
        await axios.delete(
          `${BASE_URL}/service/deleteService/${serviceIdToDelete}`
        );
        toast.success("Service deleted successfully");
        fetchBookings(currentPage); // Refresh the list after deletion
      } catch (error) {
        toast.error("Failed to delete service");
      } finally {
        setIsDeleteModalOpen(false);
        setServiceIdToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setServiceIdToDelete(null);
  };

  const columns = [
    {
      label: "Service Id",
      accessor: "ServiceId",
      render: (value) => <span className="font-medium">{value || "N/A"}</span>,
    },
    {
      label: "Service Image",
      accessor: "ServiceImage",
      render: (value) => (
        <div className="flex justify-center w-full">
          {value ? (
            <img
              src={value}
              alt="Service"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Image</span>
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Service Name",
      accessor: "ServiceName",
      render: (value) => <span className="font-medium">{value || "N/A"}</span>,
    },
    {
      label: "Estimate Price",
      accessor: "Price",
      render: (value) => (
        <span className="text-gray-600">{value || "No address provided"}</span>
      ),
    },
    {
      label: "Duration",
      accessor: "Duration",
      render: (value) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    {
      label: "Description",
      accessor: "Description",
      render: (value) => (
        <span className="text-gray-600">{value.substring(0, 15) || "N/A"}</span>
      ),
    },
    {
      label: "Date",
      accessor: "Date",
      render: (value) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    {
      label: "Actions",
      render: (value, row) => (
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleEdit(row.ServiceId)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilOff />
          </button>
          <button
            onClick={() => handleDeleteClick(row.ServiceId)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  const data = allBooking?.map((booking) => ({
    ServiceId: booking._id,
    ServiceImage: booking.imgUrl,
    ServiceName: booking.name,
    Price: booking.price,
    Duration: booking.duration,
    Description: booking.description,
    Date: formatDate(booking.createdAt),
  }));

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => fetchBookings(currentPage)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-xl font-bold text-primary">All Service</h1>
        <div className="text-sm md:text-xl font-bold text-primary">
          Total Service: {totalItems}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-40 flex justify-center items-center">
          <ClipLoader className="text-primary" />
        </div>
      ) : allBooking?.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg">
          <CustTable
            columns={columns}
            data={data}
            className="rounded-lg overflow-hidden"
            pagination={{
              currentPage,
              pageSize,
              totalItems,
              onPageChange: handlePageChange,
            }}
          />
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <h2 className="text-lg text-gray-600">No Bookings Yet</h2>
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          Are you sure you want to delete this service?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllService;
