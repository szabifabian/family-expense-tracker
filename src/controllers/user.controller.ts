import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { User } from "../entities/user";
import { hashPassword } from "../security/password-utils";

export const userRouter = Router();

userRouter
  .use((req, res, next) => {
    req.userRepository = req.orm.em.getRepository(User);
    next();
  })
  .post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    let user = await req.userRepository!.findOne({ username });

    if (user) {
      return res.sendStatus(409);
    }

    if (!username || !password || !email) {
      return res.sendStatus(422);
    }

    const hashedPassword = await hashPassword(password);
    user = new User();
    wrap(user).assign({ username, email, password: hashedPassword });
    await req.userRepository!.persistAndFlush(user);
    return res.sendStatus(200);
  })
  /**For testing purposes: */
  .get("/", async (req, res) => {
    const users = await req.userRepository!.findAll();
    res.send(users);
  });
