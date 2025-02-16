import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookingDetail = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/booking/getBookingById/${id}`
      );
      setBooking(data.bookingDoc);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch booking details.");
      setLoading(false);
    }
  };

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
                booking.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
