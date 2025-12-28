import type { Types } from "mongoose";

export type TShopReview = {
  _id: string;
  user: Types.ObjectId;
  shop: Types.ObjectId;
  rating: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
};
