import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/api/v1/seller/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifySeller: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/api/v1/seller/verify",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useSignupMutation, useVerifySellerMutation } = authApi;
