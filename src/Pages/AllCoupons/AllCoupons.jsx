import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Pagination from "../Components/Pagination";

const columns = [
  { label: "Coupon Name", accessor: "name" },
  { label: "Descriptipn", accessor: "desc" },
  { label: "Discount", accessor: "Discount" },
  { label: "Max Sicsount", accessor: "MaxDiscount" },
  { label: "Total Tickets", accessor: "numberOfCoupons" },
  { label: "Start Date", accessor: "startDate" },
  { label: "End Date", accessor: "endDate" },
  { label: "Event Status", accessor: "eventStatus" },
  // { label: "Sold Out Status", accessor: "soldOutStatus" },
  {
    label: "Actions",
    accessor: "actions",
    render: (value, row) => (
      <div className="flex gap-2 justify-center items-center cursor-pointer">
        <FaRegEdit className="text-blue-500 hover:underline" size={16} />
        <MdDelete className="text-red-500 hover:underline" size={16} />
      </div>
    ),
  },
];

const AllCoupons = () => {
  const [AllCoupons, setAllCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAllCoupons = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/coupon/getAllCouponPagination?page=${page}&pageSize=10`
        );
        console.log("data", data);
        setAllCoupons(data?.coupons);
        setTotalPages(data?.pagination?.totalPages);
      } catch (error) {
        console.log("get all customer error", error);
      }
    };
    getAllCoupons();
  }, [page]);

  const data = AllCoupons.map((coupon) => ({
    name: coupon?.name,
    desc: coupon?.desc,
    Discount: `${coupon?.discountPercentage}%`,
    MaxDiscount: `${coupon?.maxDiscount}%`,
    numberOfCoupons: coupon?.numberOfCoupons,
    startDate: new Date(coupon.startDate).toLocaleDateString('en-GB'),
    endDate: new Date(coupon.endDate).toLocaleDateString('en-GB'),
    eventStatus: coupon?.isActive ? "Active" : "Inactive",
    actions: null,
  }));
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Coupons</h1>
      {AllCoupons?.length>0 ? <CustTable
        columns={columns}
        data={data}
        className="shadow-lg rounded-lg"
      />: <h1 className="text-xl font-bold mb-4 text-primary">No Coupons</h1>}
      
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default AllCoupons;
