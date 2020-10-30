import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { User } from "../entities/user";

export const userRouter = Router();

userRouter
    .use((req,res,next) =>{
        req.userRepository = req.orm.em.getRepository(User);
        next();
    })
    /**TODO: Authentication, hashPassword -> security/password-utils.ts*/
    .post('/register', async (req, res) => {
        const {username, password, unique_code, email} = req.body;
        
        let user = new User();
        wrap(user).assign({username, email, password, unique_code});

        await req.userRepository!.persistAndFlush(user);
        return res.sendStatus(200);
    })
    /**For testing purposes: */
    .get('/', async(req, res) => {
        const users = await req.userRepository!.findAll();
        res.send(users);
    })
