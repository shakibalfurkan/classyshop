import type { NextFunction } from "express";
import AppError from "../../errors/AppError.js";
import User from "../user/user.model.js";
import type { TAuthPayload } from "./auth.interface.js";
import checkOtpRestrictions from "../../utils/checkOtpRestrictions.js";
import trackOtpRequests from "../../utils/trackOtpRequests.js";

const registerUserInToDB = async (
  payload: TAuthPayload,
  next: NextFunction
) => {
  const { email, password, name } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(400, "User already exists with this email!");
  }

  await checkOtpRestrictions(email, next);
  await trackOtpRequests(email, next);
};

export const AuthService = {
  registerUserInToDB,
};
