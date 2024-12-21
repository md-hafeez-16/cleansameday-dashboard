import React, { useState } from "react";

const AddEvents = () => {
  const [eventName, setEventName] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [celebrity, setCelebrity] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [bannerImageURL, setBannerImageURL] = useState("");
  const [timeSlots, setTimeSlots] = useState([
    { startTime: "", endTime: "", availableSlots: "" },
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-primary">Add Event</h1>
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
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
        <div>
          <label className="block text-xs font-semibold text-gray-700">
            Banner Image URL
          </label>
          <input
            type="file"
            value={bannerImageURL}
            placeholder="Enter Banner Image URL"
            className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Row 4 */}
        <div>
          <label className="block text-xs font-semibold text-gray-700">
            Time Slots
          </label>
          <div className="space-y-2">
            {timeSlots.map((timeSlot, index) => (
              <div key={index} className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Start Time"
                  className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="End Time"
                  className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Available Slots"
                  className="mt-2 text-xs block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>
        <button className="w-full py-2 mt-4 text-white bg-primary hover:bg-[#012069e9] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-bg-primary text-xs">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddEvents;
