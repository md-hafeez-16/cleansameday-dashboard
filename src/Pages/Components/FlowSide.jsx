import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  List,
  Card,
  Drawer,
  Accordion,
  AccordionBody,
  ListItem,
  AccordionHeader,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import dummylogo from "../../assets/Images/logo.jpg";

const FlowSide = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/customer": "Customer",
    "/service": "Service",
    "/bookings": "Bookings",
    "/addservice": "Add Service",
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const title = pageTitles[currentPath] || "Clean Same Day";
    document.title = title;

    if (!currentPath.includes("service")) {
      setOpen(0);
    }
    if (currentPath.includes("service")) {
      const serviceIndex = sidebarItems.findIndex(
        (item) => item.label === "Service"
      );
      setOpen(serviceIndex + 1);
    }
  }, [location]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogoutClick = () => {
    setDialogOpen(true);
  };

  const isActiveTab = (path) => {
    if (path === undefined) return false;
    return location.pathname === "/" + path || location.pathname.includes(path);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    setDialogOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const sidebarItems = [
    {
      label: "DashBoard",
      icon: <RiDashboardFill className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      label: "Service",
      icon: <BsCalendarEventFill className="h-5 w-5" />,
      sublinks: [
        { name: "All Service", path: "service" },
        { name: "Add Service", path: "addservice" },
      ],
    },
    {
      label: "Bookings",
      icon: <FaListAlt className="h-5 w-5" />,
      path: "/bookings",
    },
    {
      label: "Users",
      icon: <FaPeopleGroup className="h-5 w-5" />,
      path: "/customer",
    },
    {
      label: "Log Out",
      icon: <FaPowerOff className="h-5 w-5" />,
      onClick: handleLogoutClick,
    },
  ];

  const SidebarContent = () => (
    <Card className="h-full w-60 p-2 rounded-none border-r bg-white shadow-xl overflow-y-auto overflow-x-hidden">
      <div className="mb-2"></div>
      <List>
        {sidebarItems.map((item, index) => (
          <Accordion
            key={index}
            open={open === index + 1}
            icon={
              item.sublinks ? (
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === index + 1 ? "rotate-180" : ""
                  }`}
                />
              ) : null
            }
          >
            <ListItem className="p-0" selected={open === index + 1}>
              {item.sublinks ? (
                <AccordionHeader
                  onClick={() => handleOpen(index + 1)}
                  className={`border-b-0 p-3 cursor-pointer text-primary hover:text-blue-gray-900 ${
                    isActiveTab(item.path) ? "bg-blue-gray-50" : ""
                  }`}
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  <Typography className="mr-auto font-semibold text-sm">
                    {item.label}
                  </Typography>
                </AccordionHeader>
              ) : (
                <Link
                  to={item.path}
                  onClick={item.onClick}
                  className={`w-full flex items-center p-3 text-sm no-underline text-primary hover:text-blue-gray-900 cursor-pointer ${
                    isActiveTab(item.path) ? "bg-blue-gray-50" : ""
                  }`}
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  <Typography className="mr-auto font-semibold text-sm">
                    {item.label}
                  </Typography>
                </Link>
              )}
            </ListItem>
            {item.sublinks && (
              <AccordionBody className="py-1">
                <List className="p-0">
                  {item.sublinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subLink.path}
                      className={`w-full flex items-center p-3 no-underline text-primary hover:text-blue-gray-900 hover:bg-blue-gray-50 rounded-lg ${
                        isActiveTab(subLink.path) ? "bg-blue-gray-50" : ""
                      }`}
                    >
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      <Typography className="mr-auto font-semibold text-sm">
                        {subLink.name}
                      </Typography>
                    </Link>
                  ))}
                </List>
              </AccordionBody>
            )}
          </Accordion>
        ))}
      </List>
    </Card>
  );

  return (
    <>
      {dialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar
        color="transparent"
        fullWidth
        className="border-b shadow-none max-w-screen rounded-none fixed left-0 top-0 z-50 bg-primary md:px-10"
      >
        <div className="mx-auto flex items-center justify-between text-primary">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <img src={dummylogo} alt="ETB" className=" w-24  rounded-md" />
            {/* <h1 className="text-white">Clean Same Day</h1> */}
            {/* <Typography
    as="a"
    href="#"
    className="mr-4 cursor-pointer text-lg font-bold text-blue-gray-50 mt-1"
  >
    ETB
  </Typography> */}
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-blue-gray-50 text-blue-gray-900 flex items-center justify-center text-2xl font-bold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <Typography color="white" variant="h6">
                  {user?.firstName?.toUpperCase()}
                </Typography>
                <Typography
                  variant="small"
                  color="white"
                  className="text-xs font-semibold"
                >
                  {user?.role}
                </Typography>
              </div>
            </div>
          </div>
          <IconButton
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={toggleSidebar}
            className="ml-auto text-white lg:hidden"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </Navbar>

      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        className="lg:hidden w-64 sm:w-56 md:w-60 lg:w-64 rounded-none shadow-none border-r"
        placement="left"
      >
        <SidebarContent />
      </Drawer>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-[4.5rem] transition-transform -translate-x-full sm:translate-x-0 hidden lg:block"
        aria-label="Sidebar"
      >
        <SidebarContent />
      </aside>

      <div className="z-50 pt-12 lg:ml-56">
        <Outlet />
      </div>
    </>
  );
};

export default FlowSide;

// import React, { useEffect, useState } from "react";
// import {
//   Navbar,
//   Typography,
//   Button,
//   IconButton,
//   List,
//   Card,
//   Drawer,
//   Accordion,
//   AccordionBody,
//   ListItem,
//   AccordionHeader,
//   ListItemPrefix,
//   Avatar,
// } from "@material-tailwind/react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/outline";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { FaPeopleGroup } from "react-icons/fa6";
// import { RiDashboardFill } from "react-icons/ri";
// import { BsCalendarEventFill } from "react-icons/bs";
// import { IoTicketSharp } from "react-icons/io5";
// import { MdDiscount } from "react-icons/md";
// import { FaPowerOff } from "react-icons/fa";
// import { FaListAlt } from "react-icons/fa";
// import axios from "axios";
// import { BASE_URL } from "../../constants";
// import dummylogo from "../../assets/Images/logo.jpg";
// // import logo from "../../assets/Images/logo.jpg";

// const FlowSide = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [open, setOpen] = useState(0);
//   const [dialogOpen, setDialogOpen] = useState(false); // State for dialog
//   const location = useLocation();
//   const [logo, setLogo] = useState("");
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   console.log("user", user);

//   const pageTitles = {
//     "/dashboard": "Dashboard",
//     "/customer": "Customer",
//   };

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const title = pageTitles[currentPath] || "ETB";
//     document.title = title;
//   }, [location]);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const handleLogoutClick = () => {
//     setDialogOpen(true); // Open the dialog on clicking "Log Out"
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false); // Close the dialog
//   };

//   const handleConfirmLogout = () => {
//     setDialogOpen(false); // Close the dialog after confirmation
//     localStorage.clear();
//     navigate("/");
//   };

//   const sidebarItems = [
//     {
//       label: "DashBoard",
//       icon: <RiDashboardFill className="h-5 w-5" />,
//       path: "/dashboard", // Correct path for Home
//     },

//     {
//       label: "Service",
//       icon: <BsCalendarEventFill className="h-5 w-5" />,
//       sublinks: [
//         { name: "All Service", path: "service" },
//         { name: "Add Service", path: "addservice" },
//       ],
//     },
//     {
//       label: "Bookings",
//       icon: <FaListAlt className="h-5 w-5" />,
//       path: "/bookings",
//     },
//     {
//       label: "Users",
//       icon: <FaPeopleGroup className="h-5 w-5" />,
//       path: "/customer",
//     },

//     {
//       label: "Log Out",
//       icon: <FaPowerOff className="h-5 w-5" />,
//       onClick: handleLogoutClick,
//     },
//   ];

//   const SidebarContent = () => (
//     <Card className="h-full w-60 p-2 rounded-none border-r bg-white shadow-xl overflow-y-auto overflow-x-hidden">
//       <div className="mb-2">{/* add logo here */}</div>
//       <List>
//         {sidebarItems.map((item, index) => (
//           <Accordion
//             key={index}
//             open={open === index + 1}
//             icon={
//               item.sublinks ? (
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`mx-auto h-4 w-4 transition-transform ${
//                     open === index + 1 ? "rotate-180" : ""
//                   }`}
//                 />
//               ) : null
//             }
//           >
//             <ListItem className="p-0" selected={open === index + 1}>
//               {item.sublinks ? (
//                 <AccordionHeader
//                   onClick={() => handleOpen(index + 1)}
//                   className="border-b-0 p-3 cursor-pointer text-primary hover:text-blue-gray-900"
//                 >
//                   <ListItemPrefix>{item.icon}</ListItemPrefix>
//                   <Typography className="mr-auto font-semibold text-sm">
//                     {item.label}
//                   </Typography>
//                 </AccordionHeader>
//               ) : (
//                 <Link
//                   to={item.path} // Use the correct path here
//                   onClick={item.onClick}
//                   className="w-full flex items-center p-3 text-sm no-underline text-primary hover:text-blue-gray-900 cursor-pointer"
//                 >
//                   <ListItemPrefix>{item.icon}</ListItemPrefix>
//                   <Typography className="mr-auto font-semibold text-sm">
//                     {item.label}
//                   </Typography>
//                 </Link>
//               )}
//             </ListItem>
//             {item.sublinks && (
//               <AccordionBody className="py-1">
//                 <List className="p-0">
//                   {item.sublinks.map((subLink, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={subLink.path}
//                       className="w-full flex items-center p-3 no-underline text-primary hover:text-blue-gray-900 hover:bg-blue-gray-50 rounded-lg"
//                     >
//                       <ListItemPrefix>
//                         <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                       </ListItemPrefix>
//                       <Typography className="mr-auto font-semibold text-sm">
//                         {subLink.name}
//                       </Typography>
//                     </Link>
//                   ))}
//                 </List>
//               </AccordionBody>
//             )}
//           </Accordion>
//         ))}
//       </List>
//     </Card>
//   );

//   return (
//     <>
//       {/* Confirmation Dialog */}
//       {dialogOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">
//               Are you sure you want to log out?
//             </h2>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={handleCloseDialog}
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmLogout}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Navbar
//         color="transparent"
//         fullWidth
//         className="border-b shadow-none max-w-screen rounded-none fixed left-0 top-0 z-50 bg-primary md:px-10"
//       >
//         <div className="mx-auto flex items-center justify-between text-primary">
//           <div className="flex items-center justify-center gap-1 cursor-pointer">
//             <img src={dummylogo} alt="ETB" className=" w-20  rounded-md" />
//             {/* <h1 className="text-white">Clean Same Day</h1> */}
//             {/* <Typography
//     as="a"
//     href="#"
//     className="mr-4 cursor-pointer text-lg font-bold text-blue-gray-50 mt-1"
//   >
//     ETB
//   </Typography> */}
//           </div>

//           <div className="hidden lg:block">
//             <div className="flex items-center gap-4">
//               <div className="h-11 w-11 rounded-full bg-blue-gray-50 text-blue-gray-900 flex items-center justify-center text-2xl font-bold">
//                 {user?.firstName?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <Typography color="white" variant="h6">
//                   {user?.username?.toUpperCase()}
//                 </Typography>
//                 <Typography
//                   variant="small"
//                   color="white"
//                   className="text-xs font-semibold"
//                 >
//                   {user?.role}
//                 </Typography>
//               </div>
//             </div>
//           </div>
//           <IconButton
//             size="sm"
//             variant="text"
//             color="blue-gray"
//             onClick={toggleSidebar}
//             className="ml-auto text-white lg:hidden"
//           >
//             {isSidebarOpen ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//           </IconButton>
//         </div>
//       </Navbar>
//       {/* Drawer for mobile screens */}
//       <Drawer
//         open={isSidebarOpen}
//         onClose={toggleSidebar}
//         className="lg:hidden w-64 sm:w-56 md:w-60 lg:w-64  rounded-none shadow-none border-r"
//         placement="left"
//       >
//         <SidebarContent />
//       </Drawer>
//       {/* Sidebar for larger screens */}
//       <aside
//         id="logo-sidebar"
//         className="fixed top-0 left-0 z-40 w-64 h-screen pt-[4.5rem] transition-transform -translate-x-full sm:translate-x-0 hidden lg:block"
//         aria-label="Sidebar"
//       >
//         <SidebarContent />
//       </aside>
//       <div className="z-50 pt-12 lg:ml-56">
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default FlowSide;
