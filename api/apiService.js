import axios from "axios";
import { BASE_URL } from "../src/constants";
// import { BASE_URL } from "../constants";

export const fetchAllCompletedBookings = async () => {
  const { data } = await axios.get(`${BASE_URL}/booking/getCompletedBookings`);
  return data;
};

export const fetchAllPendingBookings = async () => {
  const { data } = await axios.get(`${BASE_URL}/booking/getPendingBookings`);
  return data;
};
