import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  List,
  Card,
  Drawer,
  Accordion,
  AccordionBody,
  ListItem,
  AccordionHeader,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { IoTicketSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";

const FlowSide = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(0);
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user);

  const pageTitles = {
    "/dashboard": "Dashboard",
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const title = pageTitles[currentPath] || "ETB";
    document.title = title;
  }, [location]);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const sidebarItems = [
    {
      label: "Home",
      icon: <RiDashboardFill className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      label: "Customer",
      icon: <FaPeopleGroup className="h-5 w-5" />,
      path: "/customer",
    },
    {
      label: "Bookings",
      icon: <FaListAlt className="h-5 w-5" />,
      path: "/bookings",
    },
    {
      label: "Events",
      icon: <BsCalendarEventFill className="h-5 w-5" />,
      sublinks: [
        { name: "All Events", path: "events" },
        { name: "Add Events", path: "addEvents" },
      ],
    },
    {
      label: "Tickets",
      icon: <IoTicketSharp className="h-5 w-5" />,
      sublinks: [
        { name: "All Tickets", path: "tickets" },
        { name: "Add Tickets", path: "addTickets" },
      ],
    },
    {
      label: "Coupons",
      icon: <MdDiscount className="h-5 w-5" />,
      sublinks: [
        { name: "All Coupons", path: "coupons" },
        { name: "Add Coupons", path: "addCoupons" },
      ],
    },
    {
      label: "Log Out",
      icon: <FaPowerOff className="h-5 w-5" />,
      // onClick: handleLogout,
    },
  ];

  const SidebarContent = () => (
    <Card className="h-full w-60 p-2 rounded-none border-r bg-white shadow-xl overflow-y-auto overflow-x-hidden">
      <div className="mb-2">{/* add logo here  */}</div>
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
                  className="border-b-0 p-3 cursor-pointer text-primary hover:text-blue-gray-900"
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  <Typography className="mr-auto  font-semibold text-sm">
                    {item.label}
                  </Typography>
                </AccordionHeader>
              ) : (
                <Link
                  to={item.path}
                  className="w-full flex items-center p-3 text-sm no-underline text-primary hover:text-blue-gray-900"
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  <Typography className="mr-auto  font-semibold text-sm">
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
                      className="w-full flex items-center p-3 no-underline text-primary hover:text-blue-gray-900 hover:bg-blue-gray-50 rounded-lg"
                    >
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      <Typography className="mr-auto  font-semibold text-sm">
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
      <Navbar
        color="transparent"
        fullWidth
        className="border-b shadow-none rounded-none fixed left-0 top-0 z-50 bg-primary px-10"
      >
        <div className="mx-auto flex items-center justify-between text-primary">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            {/* <img src={AgmrLogo} alt="" className="h-6 w-6 object-contain" /> */}
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer text-lg font-bold text-blue-gray-50 mt-1"
            >
              ETB
            </Typography>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-blue-gray-50 text-blue-gray-900 flex items-center justify-center text-2xl font-bold">
                {user?.username?.toUpperCase().charAt(0)}
              </div>
              <div>
                <Typography color="white" variant="h6">
                  {user?.username?.toUpperCase()}
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
      </Navbar>{" "}
      {/* Drawer for mobile screens */}
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        className="lg:hidden  w-64  rounded-none shadow-none border-r"
        placement="left"
      >
        <SidebarContent />
      </Drawer>{" "}
      {/* Sidebar for larger screens */}
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
