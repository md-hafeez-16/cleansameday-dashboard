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
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./Components/StatCard";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularGraph from "../Components/PieChart";
import { BASE_URL } from "../../constants";
import { ClipLoader } from "react-spinners";
import uploadToAzureStorage from "../../Utils/UploadToAzureStorage";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [eventCount, setEventCount] = useState(0);
  const [couponsCount, setCouponsCount] = useState(0);

  const [ticketsCount, setTicketsCount] = useState(0);
  const [ticketSoldCount, setTicketSoldCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [logoid, setlogoid] = useState("");
  const [logoImage, setLogoImage] = useState([]);
  const [imageLength, setImageLength] = useState(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);

  console.log("ticketsCount", ticketsCount);
  console.log("ticketSoldCount", ticketSoldCount);

  console.log("imageLength", imageLength);

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

        setTicketsCount(data?.total);

        const pendingCount = await axios.get(
          `${BASE_URL}/booking/getPendingBookingsCount`
        );

        setPendingBookingsCount(pendingCount?.count);
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
      <div className=" mt-40 flex justify-center items-center">
        <ClipLoader className="text-[#FDE7AA]" />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="grid md:grid-cols-4 grid-cols-1 mt-10 gap-5">
        <StatCard sold={eventCount} name={"Total Revinue"} />
        <StatCard sold={couponsCount} name={"Total Bookings"} />
        <StatCard sold={couponsCount} name={"completed Bookings"} />
        <StatCard sold={couponsCount} name={"Pending Bookings"} />
      </div>
    </div>
  );
};

export default Dashboard;
