import React, { useState } from "react";
import uploadToAzureStorage from "../../Utils/UploadToAzureStorage";
import axios from "axios";
import { BASE_URL } from "../../constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formDate, setFormData] = useState({
    name: "",
    description: "",
    category: "", // Ensure category is part of the initial state
    duration: "",
    price: "",
    image: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formDate, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onloadend = () => resolve({ file, preview: reader.result });
      });
    });

    Promise.all(previews).then((imageData) =>
      setImages((prev) => [...prev, ...imageData])
    );
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (img) => {
          const url = await uploadToAzureStorage(img.file);
          return url;
        })
      );

      const reqBody = {
        name: formDate.name,
        description: formDate.description,
        duration: formDate.duration,
        category: formDate.category, // Include category in the request body
        price: formDate.price,
        imgUrl: uploadedImageUrls,
      };
      console.log(reqBody);
      const res = await axios.post(`${BASE_URL}/service/addService`, reqBody);
      console.log(res.data);
      toast.success("Service Added Successfully");
      navigate("/service");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Service");
    }
  };

  return (
    <>
      <div className="py-10 p-5">
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

            <div className="w-full mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md"
                name="category"
                id="category"
                value={formDate.category}
                onChange={handleInput}
              >
                <option value="">Select a category</option>
                <option value="CLEANING SERVICE">CLEANING SERVICE</option>
                <option value="DEEP CLEANING SERVICE">
                  DEEP CLEANING SERVICE
                </option>
              </select>
            </div>

            <div className="mb-4 grid md:grid-cols-2 gap-4">
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
                Select at least three images
              </label>
              <input
                type="file"
                id="imgUrl"
                accept="image/*"
                name="imgUrl"
                multiple
                onChange={handleImageUpload}
                placeholder="Enter image URL"
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative flex justify-between">
                  <img
                    src={img.preview}
                    alt={`Room Image ${index + 1}`}
                    className="h-44 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

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
