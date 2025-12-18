"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/user/register",
      userData
    );
    return data;
  } catch (error) {
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
    const { data } = await axiosInstance.post("/api/v1/user/verify", userData);
    return data;
  } catch (error) {
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
  const nextCookies = await cookies();
  try {
    const { data } = await axiosInstance.post("/api/v1/user/login", userData);
    if (data.success) {
      nextCookies.set("accessToken", data?.data?.token?.accessToken);
      nextCookies.set("refreshToken", data?.data?.token?.refreshToken);
    }

    return data;
  } catch (error) {
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

export const logout = async () => {
  const nextCookies = await cookies();
  nextCookies.delete("accessToken");
  nextCookies.delete("refreshToken");
};

export const forgotUserPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/user/forgot-password",
      userData
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Forgot password failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
export const resetUserPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/user/reset-password",
      userData
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Reset password failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
export const changeUserPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/v1/user/change-password",
      userData
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Change password failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const tokenCheck = async (token: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/api/v1/token-check?token=${token}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Token check failed";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getNewAccessToken = async () => {
  try {
    const nextCookies = await cookies();
    const refreshToken = nextCookies.get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/api/v1/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get new access token";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};

export const getLocalUser = async () => {
  const nextCookies = await cookies();
  const accessToken = nextCookies.get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};

export const getUserFromDB = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/me`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to get user from DB";

      throw new Error(message);
    }

    throw new Error("Something went wrong");
  }
};
