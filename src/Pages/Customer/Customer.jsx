import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const Customer = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);

  const fetchCustomers = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/user/getAllUsers?page=${page}&pageSize=${pageSize}`
      );

      if (data?.userDoc) {
        setAllCustomer(data.userDoc);
        setTotalItems(data.pagination?.totalDocuments || 0);
      } else {
        setError("No customer data received");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.response?.data?.message || "Failed to fetch customers");
      toast.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    {
      label: "Users Name",
      accessor: "customerName",
      render: (value) => <span className="font-medium">{value || "N/A"}</span>,
    },
    {
      label: "Email",
      accessor: "email",
      render: (value) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    {
      label: "Phone",
      accessor: "phone",
      render: (value) => (
        <span className="text-gray-600">{value || "No phone provided"}</span>
      ),
    },
    {
      label: "Address",
      accessor: "address",
      render: (value) => {
        if (!value)
          return <span className="text-gray-500">No address provided</span>;
        return <span className="text-gray-600">{value || "N/A"}</span>;
      },
    },
  ];

  const data = allCustomer.map((customer) => ({
    customerName:
      customer?.firstName && customer?.lastName
        ? `${customer.firstName} ${customer.lastName}`
        : "N/A",
    phone: customer?.phone || "N/A",
    email: customer?.email || "N/A",
    address: customer?.address || null,
  }));

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => fetchCustomers(currentPage)}
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
        <h1 className="md:text-xl font-bold text-primary">All Users</h1>
        <div className="text-sm md:text-xl font-bold text-primary">
          Total Users: {totalItems}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-40 flex justify-center items-center">
          <ClipLoader className="text-primary" />
        </div>
      ) : allCustomer?.length > 0 ? (
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
          <h2 className="text-lg text-gray-600">No Users Yet</h2>
          <p className="text-gray-400 mt-2">
            Users data will appear here once available
          </p>
        </div>
      )}
    </div>
  );
};

export default Customer;
