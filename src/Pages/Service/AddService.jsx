import React, { useState } from "react";
import uploadToAzureStorage from "../../Utils/UploadToAzureStorage";
import axios from "axios";
import { BASE_URL } from "../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  const [formDate, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    image: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formDate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      name: formDate.name,
      description: formDate.description,
      duration: formDate.duration,
      price: formDate.price,
      imgUrl: formDate.image,
    };
    console.log(reqBody);

    try {
      const res = await axios.post(`${BASE_URL}/service/addService`, reqBody);
      console.log(res.data);
      toast.success("Service Added Successfully");
      navigate("/service");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Service");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const image = await uploadToAzureStorage(file, file.name);
    console.log(image);
    setFormData({ ...formDate, image: image });
  };

  return (
    <>
      <div className="py-10">
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Service Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formDate.name}
                onChange={handleInput}
                placeholder="Enter service name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

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
                value={formDate.description}
                onChange={handleInput}
                placeholder="Enter a detailed description of the service"
                rows="4"
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formDate.price}
                  onChange={handleInput}
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
                  name="duration"
                  value={formDate.duration}
                  onChange={handleInput}
                  placeholder="Enter duration"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="imgUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="file"
                id="imgUrl"
                name="imgUrl"
                onChange={handleImage}
                placeholder="Enter image URL"
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {formDate.image && (
              <div className="mb-6">
                <img
                  alt="Service"
                  src={formDate.image}
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddService;
