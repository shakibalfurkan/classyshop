import type { Response } from "express";
import AppError from "../../errors/AppError.js";
import User from "../user/user.model.js";
import type {
  TLoginPayload,
  TRegisterPayload,
  TUserVerificationPayload,
} from "./auth.interface.js";
import checkOtpRestrictions from "../../utils/checkOtpRestrictions.js";
import trackOtpRequests from "../../utils/trackOtpRequests.js";
import sendOtp from "../../utils/sendOtp.js";
import verifyOtp from "../../utils/verifyOtp.js";
import { isPasswordMatched } from "../../utils/passwordManager.js";
import { createToken } from "../../utils/jwtHelper/index.js";
import config from "../../config/index.js";
import { setCookie } from "../../utils/cookieHandler.js";

const registerUserInToDB = async (payload: TRegisterPayload) => {
  const { name, email } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(400, "User already exists with this email!");
  }

  await checkOtpRestrictions(email);
  await trackOtpRequests(email);
  await sendOtp(name as string, email, "user_email_verification");

  return null;
};

const verifyUser = async (payload: TUserVerificationPayload) => {
  const { name, email, password, otp } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(400, "User already exists with this email!");
  }

  await verifyOtp(email, otp);

  await User.create({
    name,
    email,
    password,
  });

  return null;
};

const loginUser = async (payload: TLoginPayload, res: Response) => {
  const { email, password: plainPassword } = payload;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(400, "User does not exist!");
  }

  const passwordMatch = await isPasswordMatched(
    plainPassword,
    user?.password as string
  );

  if (!passwordMatch) {
    throw new AppError(400, "Invalid credentials!");
  }

  const jwtPayload = {
    id: user._id.toString(),
    role: "user",
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  setCookie(res, "refreshToken", refreshToken);

  const { password, ...userData } = user.toObject();

  return { user: userData, accessToken };
};

export const AuthService = {
  registerUserInToDB,
  verifyUser,
  loginUser,
};
