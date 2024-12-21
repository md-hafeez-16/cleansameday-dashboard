import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";

const Bookings = () => {
  const [allBooking, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllCustomer = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/ticketBooking/getAllBookings`
        );
        console.log("data", data?.bookings);
        setAllBookings(data?.bookings);
      } catch (error) {
        console.log("get all customer error", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllCustomer();
  }, []);

  const columns = [
    {
      label: "Profile Picture",
      accessor: "profilePic",
      render: (value, row) => (
        <img
          src={row.profilePic}
          alt={`${row.customerName}`}
          className="h-5 w-5 rounded-full"
        />
      ),
    },
    { label: "Customer Name", accessor: "customerName" },
    // { label: "Event Name", accessor: "eventName" },
    { label: "Booking Date", accessor: "bookingDate" },
    { label: "Total Price", accessor: "totalPrice" },
    { label: "Booking Status", accessor: "bookingStatus" },
    { label: "Payment Status", accessor: "paymentStatus" },
  ];

  const data = allBooking?.map((booking) => ({
    profilePic: booking?.customer?.profilePic,
    customerName: `${booking?.customer?.firstName} ${booking?.customer?.lastName}`,
    eventName: booking?.event?.name,
    bookingDate: new Date(booking?.bookingDate).toLocaleDateString("en-GB"),
    totalPrice: `${booking?.totalPrice}`,
    bookingStatus: booking?.bookingStatus,
    paymentStatus: booking?.paymentStatus,
  }));

  if (isLoading) {
    return (
      <div className=" mt-40 flex justify-center items-center">
        <ClipLoader className="text-[#FDE7AA]" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Bookings</h1>
      {allBooking?.length > 0 ? (
        <CustTable
          columns={columns}
          data={data}
          className="shadow-lg rounded-lg"
        />
      ) : (
        <h2>No Bookings Yet</h2>
      )}
    </div>
  );
};

export default Bookings;
