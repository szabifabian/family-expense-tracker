import { Router } from "express";
import { familyMemberRouter } from "./familymember.controller";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/familymember', familyMemberRouter);