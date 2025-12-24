"use server";
import envConfig from "@/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: envConfig.baseApi,
});

axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosServer;
