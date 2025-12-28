import express, { type Request, type Response } from "express";

import cors from "cors";
import cookieParser from "cookie-parser";
import globalRouter from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFoundError from "./app/middlewares/notFoundError.js";

export async function createApp(): Promise<express.Express> {
  const app = express();

  // Middleware setup
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
      ],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the shop service!",
    });
  });

  app.use("/api/v1", globalRouter);

  app.use(globalErrorHandler);
  app.use(notFoundError);

  return app;
}
