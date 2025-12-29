import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import VerifyOTP from "@/pages/VerifyOtp/VerifyOtp";
import CreateShop from "@/pages/CreateShop/CreateShop";
import Payouts from "@/pages/Payouts/Payouts";
import StripeRefresh from "@/pages/StripeRefresh/StripeRefresh";
import StripeSuccess from "@/pages/StripeSuccess/StripeSuccess";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "/create-shop", element: <CreateShop /> },
        { path: "/payouts", element: <Payouts /> },
        { path: "/stripe-refresh", element: <StripeRefresh /> },
        { path: "/stripe-success", element: <StripeSuccess /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/verify-otp", element: <VerifyOTP /> },
  ]);
