import { Router } from "express";
import { passport } from "../security/passport";
import { familyRouter } from "./family.controller";
import { familyMemberRouter } from "./familymember.controller";
import { invitationRouter } from "./invitation.controller";
import { userRouter } from "./user.controller";

export const routes = Router();

routes.use('/user', userRouter);
routes.use('/familymember',passport.authenticate('jwt', { session: false }), familyMemberRouter);
routes.use('/family', passport.authenticate('jwt', { session: false }), familyRouter);
routes.use('/invitation', passport.authenticate('jwt', { session: false }), invitationRouter);