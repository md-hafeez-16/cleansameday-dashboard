import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../constants";

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

const Customer = () => {
  const [allCustomer, setAllCustomer] = useState([]);

  useEffect(() => {
    const getAllCustomer = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/customer/getAllCustomerPagination?page=1&pageSize=10`
        );
        console.log("data", data?.customers);
        setAllCustomer(data?.customers)
      } catch (error) {
        console.log("get all customer error", error);
      }
    };
    getAllCustomer();
  },[]);

  const data = allCustomer.map((customer) => ({
    customerName: `${customer?.firstName} ${customer?.lastName}`,
    phone: customer?.user?.phone,
    email: customer?.user?.email, 
    // actions: null, 
  }));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Customers</h1>
      <CustTable
        columns={columns}
        data={data}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default Customer;
