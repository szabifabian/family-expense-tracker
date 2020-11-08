import { Router } from "express";
import { Family } from "../entities/family";
import { FamilyMember, FamilyRole } from "../entities/familymember";
import { User } from "../entities/user";

export const familyRouter = Router();

familyRouter
    .use((req,res,next) => {
        req.userRepository = req.orm.em.getRepository(User);
        req.familyRepository = req.orm.em.getRepository(Family);
        req.familymemberRepository = req.orm.em.getRepository(FamilyMember);
        next();
    })
    .put('/edit/name', async(req, res) => {
        const loggedInUser = req.user!.id;
        const {family_name} = req.body;

        let familyMember = await req.familymemberRepository!.findOne({user: loggedInUser});
        if(familyMember && familyMember!.role === FamilyRole.Admin && familyMember!.user.id === loggedInUser){
            let family_id = familyMember!.family.id;
            await req.familyRepository!.nativeUpdate({id: family_id}, {family_name: family_name});
            return res.sendStatus(201);
        }else{
            res.sendStatus(402);
        }
    })

    //get all families
    .get('/', async(req,res) => {
        let families = await req.familyRepository!.findAll();
        res.send(families);
    })