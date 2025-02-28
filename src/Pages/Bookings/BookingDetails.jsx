import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { useCompleteBooking } from "../../../hooks/useBookings";
import toast from "react-hot-toast";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const {
    data: completeBooking,
    isLoading: completeBookingLoading,
    refetch: completeBookingRefetch,
  } = useCompleteBooking(id);

  console.log("Complete Booking Data:", completeBooking);
  const handleClose = () => {
    setOpenModel(false);
    setSelectedBooking(null);
  };

  const handlePending = async () => {
    try {
      await completeBookingRefetch();

      await fetchBookingDetail();
    } catch (error) {
      console.error("Error completing booking:", error);
      setError("Failed to complete booking.");
    }
  };

  const handleOpen = (value) => {
    console.log(value, "value");
    setSelectedBooking(value);
    setOpenModel(true);
  };
  // Fetch booking details
  const fetchBookingDetail = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/booking/getBookingById/${id}`
      );
      console.log(data);
      setBooking(data.bookingDoc);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch booking details.");
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const downloadInvoice = async (value, amount, duedate) => {
    console.log("value", value);
    console.log("amount", amount);
    console.log("duedate", duedate);

    try {
      const res = await axios.get(
        `${BASE_URL}/invoice/generateInvoice?bookingId=${value._id}&totalAmount=${amount}&dueDate=${duedate}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${value?.service?.name}.pdf`);
      document.body.appendChild(link);
      setOpenModel(false);
      completeBookingRefetch();
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Invoice Downloaded Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Download Invoice");
    }
  };

  // Fetch booking details on component mount or when ID changes
  useEffect(() => {
    fetchBookingDetail();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Booking Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* User Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {booking.firstName}{" "}
            {booking.lastName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {booking.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {booking.email}
          </p>
        </div>

        {/* Service Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Service Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">Service Name:</span>{" "}
            {booking.service.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Description:</span>{" "}
            {booking.service.description}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Price:</span> ${booking.service.price}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Duration:</span>{" "}
            {booking.service.duration}
          </p>
          <div className="mt-4">
            <img
              src={booking.service.imgUrl[0]}
              alt={booking.service.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Address</h2>
          <p className="text-gray-700">
            <span className="font-medium">Address Line 1:</span>{" "}
            {booking.address.addressLine1}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address Line 2:</span>{" "}
            {booking.address.addressLine2}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Building Number:</span>{" "}
            {booking.address.buildingNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">City:</span> {booking.address.city}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">State:</span> {booking.address.state}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Landmark:</span>{" "}
            {booking.address.landmark}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Pin Code:</span>{" "}
            {booking.address.pinCode}
          </p>
        </div>

        {/* Booking Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Booking Information</h2>
          <p className="text-gray-700">
            <span className="font-medium">Booking Date:</span>{" "}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Time:</span> {booking.time}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded ${
                booking.status === "CONFIRMED" || booking.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </p>
          {booking.status === "PENDING" && (
            <button
              className="bg-green-500 text-white px-3 py-2 mt-5 rounded"
              onClick={handlePending}
              disabled={completeBookingLoading}
            >
              {completeBookingLoading ? "Completing..." : "Complete Booking"}
            </button>
          )}

          {booking.status === "COMPLETED" && (
            <div className="flex justify-center items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(booking);
                }}
                className="bg-primary text-white px-3 py-2 rounded mt-5 "
              >
                Download Invoice
              </button>
            </div>
          )}
        </div>
      </div>

      {openModel && (
        <div
          id="default-modal"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Invoice Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <div className="flex flex-col gap-5 justify-center items-center">
                  <label className="text-center text-lg">Amount</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    className="w-64 mt-1 p-2 border border-gray-400 rounded-md "
                    placeholder="amount"
                  />
                  <label htmlFor="" className="text-center">
                    Due Date
                  </label>
                  <input
                    type="date"
                    onChange={handleDateChange}
                    className="w-64 mt-1 p-2 border border-gray-400 rounded-md "
                    placeholder="due date"
                  />
                </div>
                <button
                  onClick={() =>
                    downloadInvoice(selectedBooking, amount, dueDate)
                  }
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
