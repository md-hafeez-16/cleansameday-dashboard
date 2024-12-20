import React, { useState } from "react";
import axios from "axios";
import StatCard from "./Components/StatCard";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularGraph from "../Components/PieChart";

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // To track upload status

  const [data] = useState({
    sold: 12,
    unsold: 8,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setUploadStatus("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage); // Assuming the backend expects the field name to be "image"

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        "https://your-backend-url.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("Upload successful!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-5">
        <StatCard sold={12} total={20} name={"Total Events"} />
        <StatCard sold={12} total={20} name={"Total Tickets Sold"} />
        <StatCard sold={12} total={20} name={"Total Coupons"} />
      </div>
      <div className="flex flex-col md:flex-row md:flex-nowrap gap-5">
        <div className="w-full md:w-1/2">
          <h1 className="text-xl font-semibold text-primary p-3">
            Upload Logo :
          </h1>
          <div className="flex flex-col items-start justify-center w-full ">
            <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center">
              {preview ? (
                <div className="relative w-full h-64">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 hover:bg-gray-200 text-gray-500 cursor-pointer rounded-md"
                >
                  <FaCloudUploadAlt size={40} />
                  <span className="mt-2 text-sm font-medium">
                    Click to upload
                  </span>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            {selectedImage && (
              <button
                onClick={handleUpload}
                className="mt-4 bg-primary text-white text-xs px-4 py-2 rounded-md hover:bg-[#012268da]"
              >
                Upload Image
              </button>
            )}
            {uploadStatus && (
              <p className="mt-2 text-sm text-gray-600">{uploadStatus}</p>
            )}
          </div>
        </div>
        <div className="p-5 bg-white shadow-md rounded-lg w-full md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold mb-4 text-primary">Tickets Overview</h2>
        <CircularGraph
          labels={["Tickets Sold", "Tickets Unsold"]}
          data={[data.sold, data.unsold]}
          colors={["#012169", "#B9D9EB"]}
          title="Tickets Distribution"
        />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
