import type { NextFunction } from "express";
import { redis } from "../database/redis.js";
import AppError from "../errors/AppError.js";

const checkOtpRestrictions = async (email: string, next: NextFunction) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return next(
      new AppError(
        429,
        "Account locked due to multiple failed OTP attempts. Please try again after 15 minutes later."
      )
    );
  }

  if (await redis.get(`otp_spam_lock:${email}`)) {
    return next(
      new AppError(
        429,
        "Too many OTP requests. Please try again after 30 minutes later."
      )
    );
  }

  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(
      new AppError(
        429,
        "Please wait for 2 minutes before requesting a new OTP."
      )
    );
  }
};

export default checkOtpRestrictions;
