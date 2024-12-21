import React, { useEffect, useState } from "react";
import uploadToAzureStorage from "../../../Utils/UploadToAzureStorage";
import { Minus, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import toast from "react-hot-toast";

const EditEvents = () => {
  const { id } = useParams();

  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [celebrity, setCelebrity] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [bannerImageURL, setBannerImageURL] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    {
      type: "",
      price: "",
      availableTickets: "",
    },
  ]);

  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/event/getEventById/${id}`);
      const event = res.data.event;

      setEventName(event.name);
      setEventVenue(event.venue);
      setEventDate(event.date.split("T")[0]);
      setCelebrity(event.celebrity);
      setEventDescription(event.desc);
      setBannerImageURL(event.bannerImage);
      setEventTime(event.time);
      setTicketPrice(event.ticketPricing);
      setTimeSlots(
        event.ticketPricing.map((slot) => ({
          type: slot.type,
          price: slot.price,
          availableTickets: slot.availableTickets,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { type: "", price: "", availableTickets: "" }]);
  };

  const removeTimeSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const url = await uploadToAzureStorage(file, file.name);
    console.log(url);
    setBannerImageURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      name: eventName,
      desc: eventDescription,
      date: eventDate,
      time: eventTime,
      venue: eventVenue,
      celebrity,
      bannerImage: bannerImageURL,
      ticketPricing: timeSlots,
    };

    console.log("Request Body: ", reqBody);

    try {
      const res = await axios.post(
        `${BASE_URL}/event/updateEvent/${id}`,
        reqBody
      );
      console.log("Response: ", res.data);
      toast.success("Event Updated Successfully");
      navigate(`/events`);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to Update Event");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-primary">Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Event Name
              </label>
              <input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                type="text"
                placeholder="Enter Event Name"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Event Venue
              </label>
              <input
                type="text"
                value={eventVenue}
                onChange={(e) => setEventVenue(e.target.value)}
                placeholder="Enter Event Venue"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Celebrity
              </label>
              <input
                type="text"
                value={celebrity}
                onChange={(e) => setCelebrity(e.target.value)}
                placeholder="Enter Celebrity Name"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Event Description
            </label>
            <textarea
              placeholder="Enter Event Description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Image
              </label>
              <input
                onChange={handleImageChange}
                type="file"
                accept="image/*"
                placeholder="Enter Event Name"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {bannerImageURL ? (
                <img
                  src={bannerImageURL}
                  alt="Profile"
                  className="w-32 h-32 object-cover  ml-5 mt-3"
                />
              ) : (
                <p className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">No image selected</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="Enter Event Venue"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Event Time
              </label>
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                placeholder="Enter Celebrity Name"
                className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Time Slots
            </label>
            <div className="space-y-2">
              {timeSlots.map((timeSlot, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <select
                    value={timeSlot.type}
                    onChange={(e) =>
                      handleTimeSlotChange(index, "type", e.target.value)
                    }
                    className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Time Slot Type</option>
                    <option value="STAG">Stag</option>
                    <option value="COUPLE">Couple</option>
                    <option value="GROUP">Group</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    value={timeSlot.price}
                    onChange={(e) =>
                      handleTimeSlotChange(index, "price", e.target.value)
                    }
                    className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Available Tickets"
                    value={timeSlot.availableTickets}
                    onChange={(e) =>
                      handleTimeSlotChange(
                        index,
                        "availableTickets",
                        e.target.value
                      )
                    }
                    className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(index)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    <Minus />
                  </button>
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="text-xs text-indigo-600 hover:underline"
                  >
                    <Plus />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-primary hover:bg-[#012069e9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-bg-primary text-xs"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvents;
