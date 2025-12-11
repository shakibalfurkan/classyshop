import type { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { AuthService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.registerUserInToDB(req.body, next);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  }
);

export const AuthController = {
  registerUser,
};
