import { Router } from "express";
import { Family } from "../entities/family";
import { FamilyMember } from "../entities/familymember";
import { User } from "../entities/user";

export const familyRouter = Router();

familyRouter
  .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(User);
    req.familyRepository = req.orm.em.getRepository(Family);
    req.familymemberRepository = req.orm.em.getRepository(FamilyMember);
    next();
  })
  .get("/name", async (req, res) => {
    const loggedInUser = req.user!.id;

    let familyMemeber = await req.familymemberRepository!.findOne({
      user: loggedInUser,
    });
    if (familyMemeber) {
      const family = await req.familyRepository!.findOne({
        id: familyMemeber.family.id,
      });
      return res.send(family);
    } else {
      res.sendStatus(404);
    }
  })

  //get all families
  .get("/", async (req, res) => {
    let families = await req.familyRepository!.findAll();
    res.send(families);
  });
