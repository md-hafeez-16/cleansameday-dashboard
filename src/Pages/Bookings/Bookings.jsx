import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";

const Bookings = () => {
  const [allBooking, setAllBookings] = useState([]);

  useEffect(() => {
    const getAllCustomer = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/ticketBooking/getAllBookings`
        );
        console.log("data", data?.customers);
        setAllBookings(data?.customers);
      } catch (error) {
        console.log("get all customer error", error);
      }
    };
    getAllCustomer();
  }, []);

  const columns = [
    { label: "Customer Name", accessor: "customerName" },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone" },
    // {
    //   label: "Actions",
    //   accessor: "actions",
    //   render: (value, row) => (
    //     <div className="flex gap-2 justify-center items-center cursor-pointer">
    //       <FaRegEdit className="text-blue-500 hover:underline" size={16} />
    //       <MdDelete className="text-red-500 hover:underline" size={16} />
    //     </div>
    //   ),
    // },
  ];

  const data = allBooking?.map((customer) => ({
    customerName: `${customer?.firstName} ${customer?.lastName}`,
    phone: customer?.user?.phone,
    email: customer?.user?.email,
    // actions: null,
  }));
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Bookings</h1>
      {allBooking?.length > 0 ? (
        <CustTable
        columns={columns}
        data={data}
        className="shadow-lg rounded-lg"
      />
      ) : <h2>No Bookings Yet</h2>}
    </div>
  );
};

export default Bookings;
