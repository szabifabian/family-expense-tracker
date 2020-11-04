import { Router } from "express";
import { passport } from "../security/passport";
import { familyMemberRouter } from "./familymember.controller";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/familymember',passport.authenticate('jwt', { session: false }), familyMemberRouter);