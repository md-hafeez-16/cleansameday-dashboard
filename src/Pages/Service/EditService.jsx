import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../Utils/UploadToAzureStorage";
import toast from "react-hot-toast";

const EditService = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    imgUrl: [],
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchServiceById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service/getServiceById/${id}`);
      setFormData({
        ...res.data.serviceDoc,
        imgUrl: res.data.serviceDoc.imgUrl || [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqbody = {
      serviceId: id,
      name: formData.name,
      description: formData.description,
      duration: formData.duration,
      price: formData.price,
      imgUrl: formData.imgUrl, // Send images as an array
    };

    try {
      await axios.post(`${BASE_URL}/service/updateService`, reqbody);
      toast.success("Service Updated Successfully");
      navigate("/service");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Service");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToAzureStorage(file, file.name);
      setFormData((prev) => ({
        ...prev,
        imgUrl: [...prev.imgUrl, imageUrl], // Add new image to the array
      }));
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imgUrl: prev.imgUrl.filter((_, i) => i !== index), // Remove selected image
    }));
  };

  useEffect(() => {
    fetchServiceById();
  }, [id]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Service Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            type="text"
            value={formData.name}
            id="name"
            onChange={handleInput}
            name="name"
            placeholder="Enter service name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInput}
            placeholder="Enter a detailed description of the service"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Price & Duration */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (AED)
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleInput}
              name="price"
              placeholder="Enter price"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={formData.duration}
              onChange={handleInput}
              name="duration"
              placeholder="Enter duration"
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="imgUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="imgUrl"
            onChange={handleImageUpload}
            name="imgUrl"
            className="mt-1  block w-full  border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image Preview & Remove */}
        {formData.imgUrl.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-4">
            {formData.imgUrl.map((image, index) => (
              <div key={index} className="relative">
                <img
                  alt="Service"
                  src={image}
                  className="w-full h-52 rounded-md shadow-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
