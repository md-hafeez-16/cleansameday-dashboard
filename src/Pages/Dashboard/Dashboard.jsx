// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StatCard from "./Components/StatCard";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import CircularGraph from "../Components/PieChart";
// import { BASE_URL } from "../../constants";
// import { ClipLoader } from "react-spinners";
// import uploadToAzureStorage from "../../Utils/UploadToAzureStorage";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [uploadStatus, setUploadStatus] = useState("");
//   const [eventCount, setEventCount] = useState(0);
//   const [couponsCount, setCouponsCount] = useState(0);
//   const [ticketsCount, setTicketsCount] = useState(0);
//   const [ticketSoldCount, setTicketSoldCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [logoid, setlogoid] = useState("");
//   const [logoImage, setLogoImage] = useState([]);
//   const [imageLength, setImageLength] = useState(0);
//   const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

//   console.log("ticketsCount", ticketsCount);
//   console.log("ticketSoldCount", ticketSoldCount);

//   console.log("imageLength", imageLength);

//   useEffect(() => {
//     const handleStats = async () => {
//       setIsLoading(true);
//       try {
//         const events = await axios.get(`${BASE_URL}/invoice/totalRevenue`);
//         setEventCount(events?.data?.totalRevenue);

//         const coupons = await axios.get(`${BASE_URL}/booking/totalBookings`);

//         setCouponsCount(coupons?.data?.total);

//         const { data } = await axios.get(
//           `${BASE_URL}/booking/getCompletedBookingsCount`
//         );

//         setTicketsCount(data?.total);

//         const pendingCount = await axios.get(
//           `${BASE_URL}/booking/getPendingBookingsCount`
//         );

//         setPendingBookingsCount(pendingCount?.count);
//       } catch (error) {
//         console.log("stats Error", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     handleStats();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className=" mt-40 flex justify-center items-center">
//         <ClipLoader className="text-[#FDE7AA]" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 flex flex-col gap-5">
//       <div className="grid md:grid-cols-4 grid-cols-1 mt-10 gap-5">
//         <StatCard sold={eventCount} name={"Total Revinue"} />
//         <StatCard sold={couponsCount} name={"Total Bookings"} />
//         <StatCard sold={couponsCount} name={"completed Bookings"} />
//         <StatCard sold={couponsCount} name={"Pending Bookings"} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// <-------- ---->
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./Components/StatCard";
import { ClipLoader } from "react-spinners";
import { BASE_URL, formatDate } from "../../constants";
import {
  useCompletedBookings,
  usePendingBookings,
} from "../../../hooks/useBookings";
import CustTable from "../Components/Table";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    data: CompletedBookings,
    isLoading: loading,
    isError,
  } = useCompletedBookings();

  const {
    data: PendingBookings,
    isLoading: pendingLoading,
    isError: pendingerror,
  } = usePendingBookings();

  console.log("PendingBookings", PendingBookings);

  const [showCompletedBookings, setShowCompletedBookings] = useState(false);
  const [showPendingBookings, setShowPendingBookings] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [eventCount, setEventCount] = useState(0);
  const [couponsCount, setCouponsCount] = useState(0);
  const [ticketsCount, setTicketsCount] = useState(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = (value) => {
    setSelectedBooking(value);
    setOpenModel(true);
  };
  console.log("CompletedBookings", CompletedBookings);

  const handleCompletedBookingsClick = () => {
    console.log("Toggling completed bookings view");
    setShowCompletedBookings(!showCompletedBookings);
    setShowPendingBookings(false);
  };

  const data = CompletedBookings?.bookings?.map((booking) => ({
    bookingId: booking?._id,
    serviceName: booking?.service?.name,
    service: booking?.service,
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

  const handlePendingBookingsClick = () => {
    console.log("Toggling pending bookings view");
    setShowPendingBookings(!showPendingBookings);
    setShowCompletedBookings(false);
  };

  const PendingBookingsData = PendingBookings?.bookings?.map((booking) => ({
    bookingId: booking?._id,
    serviceName: booking?.service?.name,
    service: booking?.service,
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
    //   label: "Booking Detail",
    //   accessor: "Bookingdetail",
    //   render: (value) => (
    //     <button
    //       onClick={() => handleOpen(value)}
    //       className="bg-primary text-white px-3 py-1 rounded"
    //     >
    //       View
    //     </button>
    //   ),
    // },
    // {
    //   label: "Download Invoice",
    //   accessor: "downloadInvoice",
    //   render: (value) => (
    //     <button
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         handleOpen(value);
    //       }}
    //       className="bg-primary text-white px-3 py-1 rounded"
    //     >
    //       View
    //     </button>
    //   ),
    // },
  ];
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/bookings");
  };

  useEffect(() => {
    const handleStats = async () => {
      setIsLoading(true);
      try {
        const events = await axios.get(`${BASE_URL}/invoice/totalRevenue`);
        setEventCount(events?.data?.totalRevenue);

        const coupons = await axios.get(`${BASE_URL}/booking/totalBookings`);
        setCouponsCount(coupons?.data?.total);

        const { data } = await axios.get(
          `${BASE_URL}/booking/getCompletedBookingsCount`
        );
        setTicketsCount(data?.count);

        const pendingCount = await axios.get(
          `${BASE_URL}/booking/getPendingBookingsCount`
        );
        setPendingBookingsCount(pendingCount?.data?.count);
      } catch (error) {
        console.log("stats Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    handleStats();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-40 flex justify-center items-center">
        <ClipLoader className="text-[#FDE7AA]" />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="grid md:grid-cols-4 grid-cols-1 mt-10 gap-5">
        <StatCard sold={eventCount} name={"Total Revenue"} />
        <StatCard
          sold={couponsCount}
          name={"Total Bookings"}
          onClick={handleNavigation}
        />
        <StatCard
          sold={ticketsCount}
          name={"Completed Bookings"}
          onClick={handleCompletedBookingsClick}
        />
        <StatCard
          sold={pendingBookingsCount}
          name={"Pending Bookings"}
          onClick={handlePendingBookingsClick}
        />
      </div>

      {showCompletedBookings && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Completed Bookings
          </h2>
          <CustTable
            columns={columns}
            data={data}
            className="rounded-lg overflow-hidden"
            pagination={true}
            route="/bookings"
          />
        </div>
      )}

      {showPendingBookings && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Pending Bookings
          </h2>
          <CustTable
            columns={columns}
            data={PendingBookingsData}
            className="rounded-lg overflow-hidden"
            pagination={true}
            route="/bookings"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
