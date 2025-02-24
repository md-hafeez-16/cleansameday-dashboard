import React, { useEffect, useState } from "react";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL, formatDate } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import CSVDownloadModal from "../Components/CSVDownloadModel";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [allBooking, setAllBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleDownloadCSV = async (startDate, endDate) => {
    console.log("startDate", startDate, "endDate", endDate);
    const startdate = format(new Date(startDate), "yyyy-MM-dd");
    const enddate = format(new Date(endDate), "yyyy-MM-dd");

    try {
      const res = await axios.get(
        `${BASE_URL}/booking/download-csv?startDate=${startdate}&endDate=${enddate}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("CSV downloaded successfully");
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast.error("Failed to download CSV");
    }
  };

  const fetchBookings = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/booking/getAllBookings?page=${page}&pageSize=${pageSize}`
      );

      console.log("data", data);

      if (data?.bookingDoc) {
        setAllBookings(data.bookingDoc);
        setTotalItems(data.pagination?.totalDocuments || 0);
      } else {
        setError("No booking data received");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.response?.data?.message || "Failed to fetch bookings");
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const handleclick = (id) => {
    console.log(id);
    navigate(`/bookingdetails/${id}`);
  };

  const downloadInvoice = async (value, amount, duedate) => {
    console.log("value", value);
    console.log("amount", amount);
    console.log("duedate", duedate);

    try {
      const res = await axios.get(
        `${BASE_URL}/invoice/generateInvoice?bookingId=${value?._id}&totalAmount=${amount}&dueDate=${duedate}`,
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

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpen = (value) => {
    setSelectedBooking(value);
    setOpenModel(true);
  };

  const handleClose = () => {
    setOpenModel(false);
    setSelectedBooking(null);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const columns = [
    {
      label: "Booking ID",
      accessor: "bookingId",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      label: "Customer Name",
      accessor: "customerName",
      render: (value) => <span className="font-medium">{value || "N/A"}</span>,
    },
    {
      label: "Address",
      accessor: "Address",
      render: (value) => (
        <span className="text-gray-600">{value || "No address provided"}</span>
      ),
    },
    {
      label: "Service Name",
      accessor: "serviceName",
      render: (value) => <span className="font-medium">{value || "N/A"}</span>,
    },
    // {
    //   label: "Profile Picture",
    //   accessor: "profilePic",
    //   render: (value, row) => (
    //     <div className="flex justify-center">
    //       {row.service?.imgUrl ? (
    //         <img
    //           src={row.service.imgUrl}
    //           alt={`${row.service?.name || "Service"}`}
    //           className="h-10 w-10 rounded-full object-cover"
    //         />
    //       ) : (
    //         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
    //           <span className="text-gray-500 text-xs">No Image</span>
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },

    {
      label: "Booking Date",
      accessor: "BookingDate",
      render: (value) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    {
      label: "Booking Time",
      accessor: "BookingTime",
      render: (value) => (
        <span className="text-gray-600">{value || "N/A"}</span>
      ),
    },
    // {
    //   label: "Bookingdetail",
    //   accessor: "Bookingdetail",
    //   render: (value) => (
    //     <button
    //       onClick={() => handleclick(value)}
    //       className="bg-primary text-white px-3 py-1 rounded"
    //     >
    //       View
    //     </button>
    //   ),
    // },
    {
      label: "downloadInvoice",
      accessor: "downloadInvoice",
      render: (value) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen(value);
          }}
          className="bg-primary text-white px-3 py-1 rounded"
        >
          View
        </button>
      ),
    },
  ];

  const data = allBooking?.map((booking) => ({
    bookingId: booking?._id,
    serviceName: booking?.service?.name,
    service: booking?.service, // Keep the full service object for the profile picture render
    profilePic: booking?.service?.imgUrl,
    customerName:
      booking?.firstName && booking?.lastName
        ? `${booking.firstName} ${booking.lastName}`
        : "N/A",
    Address: booking?.address
      ? `${booking.address.addressLine1 || ""} ${
          booking.address.addressLine2 || ""
        } ${booking.address.city || ""} ${booking.address.state || ""}`
      : "No address provided",
    BookingDate: booking?.createdAt ? formatDate(booking.createdAt) : "N/A",
    BookingTime: booking?.time || "N/A",
    Bookingdetail: booking?._id || "N/A",
    downloadInvoice: booking || "N/A",
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
    <div className="p-4 py-12">
      <div className="flex justify-between md:flex-row flex-col gap-5 md:gap-0  items-center mb-6">
        <h1 className="text-xl font-bold text-primary">All Bookings</h1>
        <div className="text-sm  md:text-xl font-bold text-primary">
          Total Bookings: {totalItems}
        </div>
        <div>
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            onClick={() => setIsModalOpen(true)}
          >
            Download CSV
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-40 flex justify-center items-center">
          <ClipLoader className="text-primary" />
        </div>
      ) : allBooking?.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg  border">
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
            route="/bookings"
          />
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <h2 className="text-lg text-gray-600">No Bookings Yet</h2>
          <p className="text-gray-400 mt-2">
            Bookings will appear here once created
          </p>
        </div>
      )}

      <CSVDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownloadCSV}
      />

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

export default Bookings;

// import React, { useEffect, useState } from "react";
// import CustTable from "../Components/Table";
// import axios from "axios";
// import { BASE_URL, formatDate } from "../../constants";
// import ClipLoader from "react-spinners/ClipLoader";
// import { toast } from "react-hot-toast";
// import CSVDownloadModal from "../Components/CSVDownloadModel";
// import { format } from "date-fns";
// import AddBooking from "../Booking/AddBooking";
// import { useNavigate } from "react-router-dom";

// const Bookings = () => {
//   const [allBooking, setAllBookings] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;
//   const [totalItems, setTotalItems] = useState(0);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleDownloadCSV = async (startDate, endDate) => {
//     console.log("startDate", startDate, "endDate", endDate);
//     const startdate = format(new Date(startDate), "yyyy-MM-dd");
//     const enddate = format(new Date(endDate), "yyyy-MM-dd");

//     try {
//       const res = await axios.get(
//         `${BASE_URL}/booking/download-csv?startDate=${startdate}&endDate=${enddate}`,
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "data.csv");
//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);

//       toast.success("CSV downloaded successfully");
//     } catch (error) {
//       console.error("Error downloading CSV:", error);
//       toast.error("Failed to download CSV");
//     }
//   };

//   const fetchBookings = async (page) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get(
//         `${BASE_URL}/booking/getAllBookings?page=${page}&pageSize=${pageSize}`
//       );

//       if (data?.bookingDoc) {
//         setAllBookings(data.bookingDoc);
//         setTotalItems(data.pagination?.totalDocuments || 0);
//       } else {
//         setError("No booking data received");
//       }
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       setError(error.response?.data?.message || "Failed to fetch bookings");
//       toast.error("Failed to fetch bookings");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(currentPage);
//   }, [currentPage]);

//   const handleclick = (id) => {
//     console.log(id);
//     navigate(`/bookingdetails/${id}`);
//   };

//   const downloadInvoice = async (value) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/invoice/generateInvoice?bookingId=${value?._id}&totalAmount=${value?.service?.price}&dueDate=${value?.createdAt}`,
//         {
//           responseType: "blob",
//         }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));

//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `invoice_${value?.service?.name}.pdf`);
//       document.body.appendChild(link);
//       link.click();

//       // Clean up
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Invoice Downloaded Successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to Download Invoice");
//     }
//   };
//   const handlePageChange = (page) => {
//     setCurrentPage(page);

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const columns = [
//     {
//       label: "Booking ID",
//       accessor: "bookingId",
//       render: (value) => <span className="font-medium">{value}</span>,
//     },
//     {
//       label: "Customer Name",
//       accessor: "customerName",
//       render: (value) => <span className="font-medium">{value || "N/A"}</span>,
//     },
//     {
//       label: "Address",
//       accessor: "Address",
//       render: (value) => (
//         <span className="text-gray-600">{value || "No address provided"}</span>
//       ),
//     },
//     {
//       label: "Service Name",
//       accessor: "serviceName",
//       render: (value) => <span className="font-medium">{value || "N/A"}</span>,
//     },
//     {
//       label: "Booking Date",
//       accessor: "BookingDate",
//       render: (value) => (
//         <span className="text-gray-600">{value || "N/A"}</span>
//       ),
//     },
//     {
//       label: "Booking Time",
//       accessor: "BookingTime",
//       render: (value) => (
//         <span className="text-gray-600">{value || "N/A"}</span>
//       ),
//     },
//     // {
//     //   label: "Profile Picture",
//     //   accessor: "profilePic",
//     //   render: (value, row) => (
//     //     <div className="flex justify-center">
//     //       {row.service?.imgUrl ? (
//     //         <img
//     //           src={row.service.imgUrl}
//     //           alt={`${row.service?.name || "Service"}`}
//     //           className="h-10 w-10 rounded-full object-cover"
//     //         />
//     //       ) : (
//     //         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
//     //           <span className="text-gray-500 text-xs">No Image</span>
//     //         </div>
//     //       )}
//     //     </div>
//     //   ),
//     // },

//     {
//       label: "Bookingdetail",
//       accessor: "Bookingdetail",
//       render: (value) => (
//         <button
//           onClick={() => handleclick(value)}
//           className="bg-primary text-white px-3 py-1 rounded"
//         >
//           View
//         </button>
//       ),
//     },
//     {
//       label: "downloadInvoice",
//       accessor: "downloadInvoice",
//       render: (value) => (
//         <button
//           onClick={() => downloadInvoice(value)}
//           className="bg-primary text-white px-3 py-1 rounded"
//         >
//           Download
//         </button>
//       ),
//     },
//   ];

//   const data = allBooking?.map((booking) => ({
//     bookingId: booking?._id,
//     serviceName: booking?.service?.name,
//     service: booking?.service, // Keep the full service object for the profile picture render
//     profilePic: booking?.service?.imgUrl,
//     customerName:
//       booking?.firstName && booking?.lastName
//         ? `${booking.firstName} ${booking.lastName}`
//         : "N/A",
//     Address: booking?.address
//       ? `${booking.address.addressLine1 || ""} ${
//           booking.address.addressLine2 || ""
//         } ${booking.address.city || ""} ${booking.address.state || ""}`
//       : "No address provided",
//     BookingDate: booking?.createdAt ? formatDate(booking.createdAt) : "N/A",
//     BookingTime: booking?.time || "N/A",
//     Bookingdetail: booking?._id || "N/A",
//     downloadInvoice: booking || "N/A",
//   }));

//   if (error) {
//     return (
//       <div className="p-4 text-center">
//         <div className="text-red-500 mb-4">{error}</div>
//         <button
//           onClick={() => fetchBookings(currentPage)}
//           className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 py-12">
//       <div className="flex justify-between md:flex-row flex-col gap-5 md:gap-0  items-center mb-6">
//         <h1 className="text-xl font-bold text-primary">All Bookings</h1>
//         <div className="text-xl font-bold text-primary">
//           Total Bookings: {totalItems}
//         </div>
//         <div>
//           <button
//             className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Download CSV
//           </button>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="mt-40 flex justify-center items-center">
//           <ClipLoader className="text-primary" />
//         </div>
//       ) : allBooking?.length > 0 ? (
//         <div className="bg-white rounded-lg shadow-lg  border">
//           <CustTable
//             columns={columns}
//             data={data}
//             className="rounded-lg overflow-hidden"
//             pagination={{
//               currentPage,
//               pageSize,
//               totalItems,
//               onPageChange: handlePageChange,
//             }}
//           />
//         </div>
//       ) : (
//         <div className="text-center py-10 bg-white rounded-lg shadow">
//           <h2 className="text-lg text-gray-600">No Bookings Yet</h2>
//           <p className="text-gray-400 mt-2">
//             Bookings will appear here once created
//           </p>
//         </div>
//       )}

//       <CSVDownloadModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onDownload={handleDownloadCSV}
//       />
//     </div>
//   );
// };

// export default Bookings;
