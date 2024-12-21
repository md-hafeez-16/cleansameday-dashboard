import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddCoupons = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    maxDiscount: "",
    numberOfCoupons: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendData = {
      ...formData,
      startDate: formData.startDate
        ? format(formData.startDate, "yyyy-MM-dd")
        : null,
      endDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd") : null,
    };
    console.log("Data sent to backend:", backendData);
    try {
      const {data} = await axios.post(`${BASE_URL}/coupon/createCoupon`, backendData);
      console.log("data", data)
      toast.success("Coupon Added Successfully");
      navigate("/coupons")
    } catch (error) {
      console.log("error", error)
      toast.error(error?.response?.data?.msg)
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">Add Coupons</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-gray-700"
          >
            Coupon Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Coupon Name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block text-xs font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Coupon Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="discountPercentage"
              className="block text-xs font-semibold text-gray-700"
            >
              Discount Percentage
            </label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Discount Percentage"
            />
          </div>

          <div>
            <label
              htmlFor="maxDiscount"
              className="block text-xs font-semibold text-gray-700"
            >
              Max Discount
            </label>
            <input
              type="number"
              id="maxDiscount"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleChange}
              className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Max Discount"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-xs font-semibold text-gray-700"
            >
              Start Date
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-xs font-semibold text-gray-700 "
            >
              End Date
            </label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/YYYY"
              className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="numberOfCoupons"
            className="block text-xs font-semibold text-gray-700"
          >
            Number of Coupons
          </label>
          <input
            type="number"
            id="numberOfCoupons"
            name="numberOfCoupons"
            value={formData.numberOfCoupons}
            onChange={handleChange}
            className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Number of Coupons"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-primary hover:bg-[#012069e9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-bg-primary text-xs"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCoupons;
