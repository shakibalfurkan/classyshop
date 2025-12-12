import type { Response } from "express";
import config from "../config/index.js";

export const setCookie = (
  res: Response,
  tokenName: string,
  tokenValue: string
) => {
  res.cookie(tokenName, tokenValue, {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
};
