import React from 'react'

const AddEvents = () => {
  return (
    <div>
     <h1 className="text-xl font-bold mb-4 text-primary">Add Events</h1>

     <div>
      <div>
        <label>Event Name</label>
        <input type="text" placeholder="Enter Event Name" className="w-full mt-1 p-2 border border-gray-300 rounded-lg"/>
      </div>
     </div>


    </div>
  )
}

export default AddEvents
