import { redis } from "../database/redis.js";
import AppError from "../errors/AppError.js";

const trackOtpRequests = async (email: string) => {
  const otpRequestsKey = `otp_request_count:${email}`;

  if (await redis.get(`otp_spam_block:${email}`)) {
    throw new AppError(
      429,
      "Too many OTP requests. Please try again after 60 minutes."
    );
  }

  let otpRequests = parseInt((await redis.get(otpRequestsKey)) || "0");
  otpRequests += 1;

  if (otpRequests >= 3) {
    await redis.set(`otp_spam_block:${email}`, "blocked", "EX", 60 * 60);
  }

  await redis.set(otpRequestsKey, otpRequests.toString(), "EX", 30 * 60);

  return true;
};

export default trackOtpRequests;
