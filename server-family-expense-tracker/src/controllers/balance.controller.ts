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
    let familyMembers = await req.familymemberRepository!.findOne({
      user: loggedInUserId,
    });
    let expenses = await req.balanceRepository!.find({
      familymembers: { id: familyMembers?.id },
    });
    res.send(expenses);
  })
  .get("/:expenseId", async (req, res) => {
    const loggedInUserId = req.user!.id;
    const expenseId = parseInt(req.params.expenseId);
    let familyMembers = await req.familymemberRepository!.findOne({
      user: loggedInUserId,
      balances: { id: expenseId },
    });
    let expense = await req.balanceRepository!.findOne({
      familymembers: { id: familyMembers?.id },
    });
    if (!expense) {
      res.send(403);
    } else {
      res.send(expense);
    }
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
      res.send(balance)
    } else {
      res.sendStatus(402);
    }
  })
  .put("/edit/:expenseId", async (req, res) => {
    const loggedInUserId = req.user!.id;
    const expenseId = parseInt(req.params.expenseId);
    let familyMembers = await req.familymemberRepository!.findOne({
      user: loggedInUserId,
      balances: { id: expenseId },
    });
    let expense = await req.balanceRepository!.findOne({
      familymembers: { id: familyMembers?.id },
    });

    const editedExpense = {
      title: req.body.title ? req.body.title : expense?.title,
      type: req.body.type ? req.body.type : expense?.type,
      amount: req.body.amount ? req.body.amount : expense?.amount,
      about: req.body.about ? req.body.about : expense?.about,
    };

    if (!expense) {
      res.send(403);
    } else {
      await req.balanceRepository?.nativeUpdate(
        { id: expenseId },
        editedExpense
      );
      res.sendStatus(200);
    }
  })
  .delete("/delete/:expenseId", async (req, res) => {
    const loggedInUserId = req.user!.id;
    const expenseId = parseInt(req.params.expenseId);
    const expense = await req.balanceRepository!.findOne({ id: expenseId });

    if (expense) {
      await req.balanceRepository!.nativeDelete({ id: expenseId });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
