import { createBrowserRouter, Navigate } from "react-router";

import Login from "../pages/Login/Login";
import Signup from "@/pages/Signup/Signup";
import VerifyOTP from "@/pages/VerifyOtp/VerifyOtp";
import CreateShop from "@/pages/CreateShop/CreateShop";
import Payouts from "@/pages/Payouts/Payouts";
import StripeRefresh from "@/pages/StripeRefresh/StripeRefresh";
import StripeSuccess from "@/pages/StripeSuccess/StripeSuccess";
import PrivateRoute from "@/middleware/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      element: <PrivateRoute />,
      children: [
        {
          element: <MainLayout />,
          children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "payouts", element: <Payouts /> },
          ],
        },

        { path: "create-shop", element: <CreateShop /> },
        { path: "stripe-refresh", element: <StripeRefresh /> },
        { path: "stripe-success", element: <StripeSuccess /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/verify-otp", element: <VerifyOTP /> },
  ]);
