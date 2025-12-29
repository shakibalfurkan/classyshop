import { baseApi } from "@/redux/api/baseApi";

export const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (shopInfo) => ({
        url: "/auth/api/v1/seller/create-shop",
        method: "POST",
        body: shopInfo,
      }),
    }),
    connectStripeAccount: builder.mutation({
      query: () => ({
        url: "/auth/api/v1/seller/create-stripe-connection-link",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateShopMutation, useConnectStripeAccountMutation } =
  shopApi;
