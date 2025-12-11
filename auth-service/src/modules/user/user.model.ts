import { model, Schema } from "mongoose";
import type { TUser } from "./user.interface.js";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, select: false },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const User = model<TUser>("User", userSchema);

export default User;
