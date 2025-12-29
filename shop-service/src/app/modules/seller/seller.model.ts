import { model, Schema } from "mongoose";
import type { TSeller } from "./seller.interface.js";

const sellerSchema = new Schema<TSeller>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    stripeAccountId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//remove password string after saving data
sellerSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const Seller = model<TSeller>("Seller", sellerSchema);

export default Seller;
