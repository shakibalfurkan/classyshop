import type { NextFunction } from "express";
import { redis } from "../database/redis.js";
import AppError from "../errors/AppError.js";

const trackOtpRequests = async (email: string, next: NextFunction) => {
  const otpRequestsKey = `otp_request_count:${email}`;

  let otpRequests = parseInt((await redis.get(otpRequestsKey)) || "0");

  if (otpRequests >= 3) {
    await redis.set(`otp_spam_block:${email}`, "blocked", "EX", 30 * 60);
    return next(
      new AppError(
        400,
        "Too many OTP requests. Please try again after 30 minutes."
      )
    );
  }

  await redis.set(otpRequestsKey, otpRequests + 1, "EX", 30 * 60);
};

export default trackOtpRequests;
