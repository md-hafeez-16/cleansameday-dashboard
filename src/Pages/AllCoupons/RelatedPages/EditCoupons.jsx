import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import { format } from "date-fns";
import toast from "react-hot-toast";
const EditCoupons = () => {
  const [couponDetails, setCouponDetails] = useState({
    name: "",
    desc: "",
    discountPercentage: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
    numberOfCoupons: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCouponById = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/coupon/getCouponById/${id}`
        );
        const fetchedData = data?.coupons;
        setCouponDetails({
          ...fetchedData,
          startDate: new Date(fetchedData.startDate),
          endDate: new Date(fetchedData.endDate),
        });
      } catch (error) {
        console.log("get customer by id error", error);
      }
    };
    getCouponById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setCouponDetails((prev) => ({
      ...prev,
      [fieldName]: date,
    }));
  };

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    const payload = {
      couponId: id,
      name: couponDetails.name,
      desc: couponDetails.desc,
      discountPercentage: couponDetails.discountPercentage,
      maxDiscount: couponDetails.maxDiscount,
      numberOfCoupons: couponDetails.numberOfCoupons,
      startDate: couponDetails.startDate
        ? format(couponDetails.startDate, "yyyy-MM-dd")
        : null,
      endDate: couponDetails.endDate
        ? format(couponDetails.endDate, "yyyy-MM-dd")
        : null,
    };
    console.log("payload", payload);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/coupon/updateCoupon`,
        payload
      );
      console.log("data", data);
      toast.success("Coupon updated successfully");
      navigate("/coupons")
    } catch (error) {
      console.log("error", error);
      alert("Failed to update coupon. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">Edit Coupons</h1>
      <form onSubmit={handleUpdateCoupon}>
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
            value={couponDetails.name}
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
            value={couponDetails.desc}
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
              value={couponDetails.discountPercentage}
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
              value={couponDetails.maxDiscount}
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
              selected={couponDetails.startDate}
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
              selected={couponDetails.endDate}
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
            value={couponDetails.numberOfCoupons}
            onChange={handleChange}
            className="mt-2 block text-xs w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Number of Coupons"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-primary hover:bg-[#012069e9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-bg-primary text-xs"
        >
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default EditCoupons;
