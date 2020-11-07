import { Router } from "express";
import { Family } from "../entities/family";
import { FamilyMember, FamilyRole } from "../entities/familymember";
import { Balance } from "../entities/balance";
import { User } from "../entities/user";
import { wrap } from "@mikro-orm/core";

export const balanceRouter = Router();

balanceRouter
  .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(User);
    req.familyRepository = req.orm.em.getRepository(Family);
    req.familymemberRepository = req.orm.em.getRepository(FamilyMember);
    req.balanceRepository = req.orm.em.getRepository(Balance);
    next();
  })
  .get("/", async (req, res) => {
    const loggedInUserId = req.user!.id;
    let familyMembers = await req.familymemberRepository!.findOne({user: loggedInUserId});
    let expenses = await req.balanceRepository!.find({familymembers:{id: familyMembers?.id}});
    res.send(expenses);
  })
  .post("/add", async (req, res) => {
    const loggedInUserId = req.user!.id;
    let familyMember = await req.familymemberRepository!.findOne({
      user: loggedInUserId,
    });
    if (familyMember && familyMember!.user.id === loggedInUserId) {
      const balance = new Balance();
      const wrappedBalance = wrap(balance);
      wrappedBalance.assign(req.body, { em: req.orm.em });
      familyMember!.balances.add(balance);
      await req.familyRepository!.persistAndFlush(balance);
      res.sendStatus(200);
    } else {
      res.sendStatus(402);
    }
  })
  .delete("/delete/:expenseId", async (req, res) => {
    const loggedInUserId = req.user!.id;
    const expenseId = parseInt(req.params.expenseId);
    await req.balanceRepository!.nativeDelete({id:expenseId});
    res.sendStatus(200);
  });
