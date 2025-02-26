// import { useQuery } from "@tanstack/react-query";
// import {
//   fetchAllCompletedBookings,
//   fetchAllPendingBookings,
//   handleCompleteBooking,
// } from "../api/apiService";

// export const useCompletedBookings = () => {
//   return useQuery("completedBookings", fetchAllCompletedBookings);
// };

// export const usePendingBookings = () => {
//   return useQuery("pendingBookings", fetchAllPendingBookings);
// };

// export const useCompleteBooking = (id) => {
//   return useQuery({
//     queryKey: ["completeBooking", id],
//     queryFn: () => handleCompleteBooking(id),
//     enabled: false,
//   });
// };
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCompletedBookings,
  fetchAllPendingBookings,
  handleCompleteBooking,
} from "../api/apiService";

export const useCompletedBookings = () => {
  return useQuery({
    queryKey: "completedBookings",
    queryFn: fetchAllCompletedBookings,
  });
};

export const usePendingBookings = () => {
  return useQuery({
    queryKey: "pendingBookings",
    queryFn: fetchAllPendingBookings,
  });
};

export const useCompleteBooking = (id) => {
  return useQuery({
    queryKey: ["completeBooking", id],
    queryFn: () => handleCompleteBooking(id),
    enabled: false,
  });
};
