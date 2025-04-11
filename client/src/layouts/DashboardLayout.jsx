import { Outlet, useLocation } from "react-router";
import { Link } from "react-router";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBagShopping, FaUser } from "react-icons/fa6";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa6";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-gray-600 text-sm w-full p-4 overflow-x-auto">
      <ul className="flex flex-wrap items-center space-x-2">
        <li>
          <Link
            to="/dashboard"
            className="text-blue-500 hover:underline flex items-center"
          >
            <AiOutlineHome className="w-4 h-4 mr-1" /> Dashboard
          </Link>
        </li>
        {pathnames.slice(1).map((segment, index) => {
          const path = `/dashboard/${pathnames.slice(1, index + 2).join("/")}`;
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={path} className="text-blue-500 capitalize">
                {segment}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const DashBoardLayout = () => {
  const isAdmin = true;
  return (
    <>
      {isAdmin ? (
        <div className="drawer drawer-mobile lg:drawer-open">
          <div className="flex justify-between items-center p-4 bg-gray-100 lg:hidden">
            <button
              className="text-gray-600 p-2"
              onClick={() => document.getElementById("sidebar-toggle").click()}
            >
              <AiOutlineMenu className="w-6 h-6" />
            </button>
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>

          <input
            id="sidebar-toggle"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col w-full">
            <Breadcrumbs />

            <div className="flex flex-col items-center justify-center p-4">
              <Outlet />
            </div>
          </div>

          <div className="drawer-side">
            <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <a href="/dashboard" className="flex justify-start mb-3">
                  <img src="/logo1.jpg" className="w-20 rounded-full" />
                  <div className="badge badge-primary ml-3">Admin</div>
                </a>
              </li>

              <div>
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">Menu</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <li>
                  <Link to="/dashboard" className="flex items-center">
                    <MdDashboardCustomize className="w-5 h-5 mr-2" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-orders"
                    className="flex items-center"
                  >
                    <FaBagShopping className="w-5 h-5 mr-2" /> Manage Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-product"
                    className="flex items-center"
                  >
                    <IoIosAddCircle className="w-5 h-5 mr-2" /> Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manageItems"
                    className="flex items-center"
                  >
                    <RiAlignItemLeftLine className="w-5 h-5 mr-2" /> Manage
                    Items
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="flex items-center"
                  >
                    <FaUser className="w-5 h-5 mr-2" /> All Users
                  </Link>
                </li>
              </div>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <li>
                <Link to="/" className="flex items-center">
                  <AiOutlineHome className="w-5 h-5 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center">
                  <FaBoxOpen className="w-5 h-5 mr-2" /> Product
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="flex items-center">
                  <MdOutlineLocalShipping className="w-5 h-5 mr-2" /> Order
                  Tracking
                </Link>
              </li>
              <li>
                <Link to="/support" className="flex items-center">
                  <BiSupport className="w-5 h-5 mr-2" /> Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-red-500">You are not an Admin</div>
      )}
    </>
  );
};

export default DashBoardLayout;