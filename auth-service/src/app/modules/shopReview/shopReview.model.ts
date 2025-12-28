import { model, Schema } from "mongoose";
import type { TShopReview } from "./shopReview.interface.js";

const shopReviewSchema = new Schema<TShopReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ShopReview = model("ShopReview", shopReviewSchema);
export default ShopReview;
