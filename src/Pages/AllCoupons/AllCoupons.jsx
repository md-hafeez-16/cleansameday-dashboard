import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustTable from "../Components/Table";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

const AllCoupons = () => {
  const [AllCoupons, setAllCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [couponID, setCouponID] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const getAllCoupons = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/coupon/getAllCouponPagination?page=${page}&pageSize=10`
      );
      console.log("data", data);
      setAllCoupons(data?.coupons);
      setTotalPages(data?.pagination?.totalPages);
    } catch (error) {
      console.log("get all customer error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, [page]);

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
          <FaRegEdit
            className="text-blue-500 hover:underline"
            size={16}
            onClick={() => navigate(`/editCoupons/${value?._id}`)}
          />
          <MdDelete
            className="text-red-500 hover:underline"
            size={16}
            onClick={() => {
              handleOpenDialog(value);
            }}
          />
        </div>
      ),
    },
  ];

  const data = AllCoupons.map((coupon) => ({
    name: coupon?.name,
    desc: coupon?.desc,
    Discount: `${coupon?.discountPercentage}%`,
    MaxDiscount: `${coupon?.maxDiscount}%`,
    numberOfCoupons: coupon?.numberOfCoupons,
    startDate: new Date(coupon.startDate).toLocaleDateString("en-GB"),
    endDate: new Date(coupon.endDate).toLocaleDateString("en-GB"),
    eventStatus: coupon?.isActive ? "Active" : "Inactive",
    actions: coupon,
  }));

  const handleOpenDialog = (value) => {
    setCouponID(value?._id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/coupon/deleteCoupon/${couponID}`);
      getAllCoupons();
      handleCloseDialog();
      toast.success("Coupon Deleted Successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (isLoading) {
    return (
      <div className=" mt-40 flex justify-center items-center">
        <ClipLoader className="text-[#FDE7AA]" />
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Coupons</h1>
      {AllCoupons?.length > 0 ? (
        <CustTable
          columns={columns}
          data={data}
          className="shadow-lg rounded-lg"
        />
      ) : (
        <h1 className="mb-4 text-primary">No Coupons</h1>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-sm font-semibold mb-4">
              Are you sure you want to delete this Coupon?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
