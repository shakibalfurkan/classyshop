import { model, Schema } from "mongoose";
import type { TUser } from "./user.interface.js";
import config from "../../config/index.js";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, default: null, select: false },
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

//pre save middleware / hook
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (!this.password) return;

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
});

//remove password string after saving data
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

const User = model<TUser>("User", userSchema);

export default User;
