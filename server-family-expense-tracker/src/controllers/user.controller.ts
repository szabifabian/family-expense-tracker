import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { User } from "../entities/user";
import { hashPassword } from "../security/password-utils";
import { generateJwt } from "../security/jwtGenerator";
import { passport } from "../security/passport";

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
  .post("/login", async (req, res) => {
    const { username, password }: AuthenticationDto = req.body;
    const user = await req.userRepository!.findOne({ username });
    if (!user) {
      return res.sendStatus(401);
    }
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.sendStatus(401);
    }
    return res.send({
      token: generateJwt(user),
    });
  })

  .get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const loggedInUserId = (req.user!.id);
    const user = await req.userRepository!.findOne({ id: loggedInUserId });
    if (!user) {
      return res.sendStatus(404); //required user is not found
    } else {
      return res.send(user);
    }
  })

interface AuthenticationDto {
  username: string;
  password: string;
}
