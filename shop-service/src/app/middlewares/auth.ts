import type { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../errors/AppError.js";

import config from "../config/index.js";
import type { JwtPayload } from "jsonwebtoken";
import { USER_ROLES } from "../constant/index.js";

import { AuthError } from "../errors/authError.js";

import { jwtHelper } from "../utils/jwtHelper/index.js";
import Seller from "../modules/seller/seller.model.js";

export const auth = (
  ...requiredRoles: (typeof USER_ROLES)[keyof typeof USER_ROLES][]
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies.sellerAccessToken ||
      req.cookies.adminAccessToken ||
      req.headers.authorization?.split(" ")[1];

    console.log({ token });

    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    const decodedToken = jwtHelper.verifyToken(
      token,
      config.jwt_access_token_secret!
    ) as JwtPayload;

    const { id, email, role } = decodedToken;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      throw new AppError(401, "You are not authorized!");
    }

    if (!requiredRoles.includes(role)) {
      return AuthError(req, res);
    }

    req.seller = {
      id: seller._id,
      email: seller.email,
      role,
    };

    next();
  });
};
