import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Family } from "../entities/family";
import { FamilyMember, FamilyRole } from "../entities/familymember";
import { User } from "../entities/user";

export const familyMemberRouter = Router();

familyMemberRouter
    .use((req,res,next) =>{
        req.familymemberRepository = req.orm.em.getRepository(FamilyMember);
        req.userRepository = req.orm.em.getRepository(User);
        req.familyRepository = req.orm.em.getRepository(Family);
        next();
    })
    //create new family->become first family member
    .post('/create/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        let registeredUser = await req.userRepository!.findOne({id: id}); //check whether is a registered user
        if(!registeredUser){
            return res.sendStatus(404); //not found
        }else{
            //check whether is already a family member
            let familyMembers = await req.familymemberRepository!.findOne({user: id});
            if(familyMembers){
                return res.sendStatus(409); //conflict error response
            }else{
                //become a member of a family
                let newFamily = new Family();
                wrap(newFamily).assign({family_name: ''}, {em: req.orm.em});
                await req.familyRepository!.persistAndFlush(newFamily);

                const familymember = new FamilyMember();
                wrap(familymember).assign({role: FamilyRole.Admin, user: id, family: newFamily.id}, {em: req.orm.em});
                await req.familymemberRepository!.persistAndFlush(familymember);
                return res.sendStatus(201);
            }
        }
    })
    //get familymembers of a family
    .get('/:familyId/members', async (req, res) => {
        const familyId = parseInt(req.params.familyId);
        let family = await req.familyRepository!.findOne({id: familyId});
        if(!family){
            return res.sendStatus(404);
        }
        const members = await req.familymemberRepository!.find(
            {family: familyId}
        );
        res.send(members);
    })