import { Router } from "express";
import { ShopRoutes } from "../modules/shop/shop.route.js";

const globalRouter: Router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: ShopRoutes,
  },
];

moduleRoutes.forEach((route) => globalRouter.use(route.path, route.route));

export default globalRouter;
