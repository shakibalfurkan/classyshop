import { createSlice } from "@reduxjs/toolkit";

export type TSeller = {
  _id: string;
  name: string;
  email: string;
  bio: string;
  phoneNumber: string;
  country: string;
  password: string;
  stripeId: string;
  createdAt: Date;
  updatedAt: Date;
};

type TAuthState = {
  seller: TSeller | null;
  isUserLoading: boolean;
};

const initialState: TAuthState = {
  seller: null,
  isUserLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSeller: (state, action) => {
      const seller = action.payload;
      state.seller = seller;
      state.isUserLoading = false;
    },
    logout: (state) => {
      state.seller = null;
      state.isUserLoading = false;
    },
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload;
    },
  },
});

export const { setSeller, setIsUserLoading, logout } = authSlice.actions;

export default authSlice.reducer;
