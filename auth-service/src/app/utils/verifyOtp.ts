import { redis } from "../database/redis.js";
import AppError from "../errors/AppError.js";

const MAX_ATTEMPTS = 3;
const BLOCK_TIME = 30 * 60;

const verifyOtp = async (email: string, otp: string) => {
  const blockKey = `otp_block:${email}`;
  const attemptKey = `otp_attempts:${email}`;
  const otpKey = `otp:${email}`;

  const isBlocked = await redis.get(blockKey);
  if (isBlocked) {
    throw new AppError(
      429,
      "Too many failed attempts. Please try again after 30 minutes."
    );
  }

  const storedOtp = await redis.get(otpKey);
  if (!storedOtp) {
    throw new AppError(400, "Invalid or Expired OTP");
  }

  if (otp !== storedOtp) {
    const failedAttempts = Number((await redis.get(attemptKey)) ?? 0) + 1;

    if (failedAttempts >= MAX_ATTEMPTS) {
      await redis
        .multi()
        .set(blockKey, "blocked", "EX", BLOCK_TIME)
        .del(otpKey, attemptKey)
        .exec();

      throw new AppError(
        429,
        "Account blocked due to multiple failed OTP attempts. Please try again after 30 minutes."
      );
    }

    await redis.set(attemptKey, failedAttempts.toString(), "EX", BLOCK_TIME);

    throw new AppError(
      400,
      `Invalid OTP. ${MAX_ATTEMPTS - failedAttempts} attempts left.`
    );
  }

  await redis.del(otpKey, attemptKey);
};

export default verifyOtp;
