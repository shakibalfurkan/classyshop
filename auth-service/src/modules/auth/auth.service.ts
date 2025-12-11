import type { NextFunction } from "express";
import AppError from "../../errors/AppError.js";
import User from "../user/user.model.js";
import type { TAuthPayload } from "./auth.interface.js";
import checkOtpRestrictions from "../../utils/checkOtpRestrictions.js";

const registerUserInToDB = async (
  payload: TAuthPayload,
  next: NextFunction
) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new AppError(400, "User already exists with this email!");
  }

  await checkOtpRestrictions(payload.email, next);
};

export const AuthService = {
  registerUserInToDB,
};
