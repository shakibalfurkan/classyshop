"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { isAxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/register-user",
      userData
    );
    return data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Register failed";
      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const verifyUser = async (userData: FieldValues) => {
  try {
    console.log({ userData });
    const { data } = await axiosInstance.post("/api/v1/verify-user", userData);
    return data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Verification failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/api/v1/login-user", userData);
    return data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
