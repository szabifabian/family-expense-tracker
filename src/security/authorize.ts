import { RequestHandler } from "express-serve-static-core";
import { FamilyRole } from "../entities/familymember";

export function authorize(role: FamilyRole): RequestHandler {
  return (req, res, next) => {
    /*if (req.familymemberRepository?.role === role) {
      return next();
    }*/
    return res.sendStatus(403);
  }
}
