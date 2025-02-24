import { useQuery } from "react-query";
import {
  fetchAllCompletedBookings,
  fetchAllPendingBookings,
} from "../api/apiService";

export const useCompletedBookings = () => {
  return useQuery("completedBookings", fetchAllCompletedBookings);
};

export const usePendingBookings = () => {
  return useQuery("pendingBookings", fetchAllPendingBookings);
};
