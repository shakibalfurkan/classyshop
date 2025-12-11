import type { NextFunction } from "express";

const checkOtpRestrictions = async (email: string, next: NextFunction) => {
  // Implementation of OTP restriction checks goes here
};

export default checkOtpRestrictions;
