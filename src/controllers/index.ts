import { Router } from "express";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/user', userRouter);