import React, { useState } from 'react';

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
      <h1 className="text-2xl font-bold mb-6 text-primary">Add Event</h1>
      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-semibold">Event Name</label>
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              type="text"
              placeholder="Enter Event Name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Event Venue</label>
            <input
              type="text"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
              placeholder="Enter Event Venue"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Celebrity</label>
            <input
              type="text"
              value={celebrity}
              onChange={(e) => setCelebrity(e.target.value)}

              placeholder="Enter Celebrity Name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div>
          <label className="block font-semibold">Event Description</label>
          <textarea
            placeholder="Enter Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            rows="4"
          />
        </div>

        {/* Row 3 */}
        <div>
          <label className="block font-semibold">Banner Image URL</label>
          <input
            type="file"
            value={bannerImageURL}

            placeholder="Enter Banner Image URL"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Row 4 */}
        <div>
          <label className="block font-semibold">Time Slots</label>
          <div className="space-y-2">
           {
              timeSlots.map((timeSlot, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Start Time"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="End Time"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                  />  
                  <input
                    type="text"
                    placeholder="Available Slots"
                    className="flex-1 p-2 border border-gray-300 rounded-lg"  
                  />
                </div>   
              ))
           }
            
          </div>
        </div>

        {/* Submit Button */}
        <button className="px-4 py-2 bg-primary text-white rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddEvents;
