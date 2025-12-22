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
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/api/v1/seller/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/api/v1/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifySellerMutation,
  useLoginMutation,
  useGetMeQuery,
} = authApi;
