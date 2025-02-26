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


export const handleCompleteBooking = async (id)=>{
  const {data} = await axios.post(`${BASE_URL}/booking/completeBooking/${id}`);
  return data
}