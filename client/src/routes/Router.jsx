  import { createBrowserRouter } from "react-router";
  import MainLayout from "../layouts/Main";
  import Home from "../pages/Home/Home";
  import Shop from "../pages/Shop/index";
  import Cart from "../pages/Cart/index";
  import SignUp from "../components/SingUp";
  import SignIn from "../components/SingIn";
  import Profile from "../pages/Profile/Index";
  import UpdateProfile from "../pages/Profile/UpdateProfile";
  import Setting from "../pages/Setting/Index";
  import DashboardLayout from "../layouts/DashboardLayout";
  import Dashboard from "../pages/Dashboard/Index";
  import AddProduct from "../pages/AddProduct/Index";
  import ManageItems from "../pages/ManageItems/Index";
  import CheckOutSuccess from "../pages/CheckOutSuccess/Index";
  import ManageUser from "../pages/ManageUser/Index";
  import ManageOrders from "../pages/ManageOrders/Index";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/updateProfile",
          element: <UpdateProfile />,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
        {
          path: "/checkout-success",
          element: <CheckOutSuccess />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "manageItems",
          element: <ManageItems />,
        },
        {
          path: "manage-users",
          element: <ManageUser />,
        },
        {
          path: "manage-orders",
          element: <ManageOrders />,
        },
      ],
    },
  ]);
  export default router;
