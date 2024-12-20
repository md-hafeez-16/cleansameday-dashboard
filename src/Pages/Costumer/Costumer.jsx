import React from "react";

const columns = [
  { label: "Customer Name", accessor: "customerName" },
  { label: "Phone", accessor: "phone" },
  { label: "Email", accessor: "email" },
  { label: "Event Type", accessor: "eventType" },
  { label: "Number of Tickets", accessor: "numberOfTickets" },
  { label: "Rupees", accessor: "rupees" },
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

const data = [
  {
    customerName: "John Doe",
    phone: "+1234567890",
    email: "john.doe@example.com",
    eventType: "Music",
    numberOfTickets: 2,
    rupees: 2000,
  },
  {
    customerName: "Jane Smith",
    phone: "+0987654321",
    email: "jane.smith@example.com",
    eventType: "Art",
    numberOfTickets: 1,
    rupees: 1500,
  },
  {
    customerName: "Alice Johnson",
    phone: "+1122334455",
    email: "alice.johnson@example.com",
    eventType: "Tech",
    numberOfTickets: 3,
    rupees: 3000,
  },
];

const Costumer = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-primary">All Customers</h1>
      <CustTable
        columns={columns}
        data={data}
        className="shadow-lg rounded-lg"
      />
    </div>
  );
};

export default Costumer;
