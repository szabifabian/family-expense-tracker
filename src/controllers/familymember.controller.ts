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
    .post('/create', async (req, res) => {
        const loggedInUserId = (req.user!.id);

        //check whether is already a family member
        let familyMembers = await req.familymemberRepository!.findOne({user: loggedInUserId});
        if(familyMembers){
            return res.sendStatus(409); //conflict error response
        }else{
            //become a member of a family
            let newFamily = new Family();
            wrap(newFamily).assign({family_name: ''}, {em: req.orm.em});
            await req.familyRepository!.persistAndFlush(newFamily);

            const familymember = new FamilyMember();
            wrap(familymember).assign({role: FamilyRole.Admin, user: loggedInUserId, family: newFamily.id}, {em: req.orm.em});
            await req.familymemberRepository!.persistAndFlush(familymember);
            return res.sendStatus(201);
        }
    })
    //get familymembers of your family
    .get('/:familyId/members', async (req, res) => {
        const loggedInUserId = (req.user!.id);
        const familyId = parseInt(req.params.familyId);
        const memberOfTheFamily = await req.familymemberRepository!.findOne({user: loggedInUserId, family: familyId});
        if (!memberOfTheFamily){ //not member of the family
            return res.sendStatus(403); //forbidden
        }
        const members = await req.familymemberRepository!.find(
            {family: familyId}
        );
        res.send(members);
    })
    //delete a familymember (you have to be the admin of family)
    .delete('/delete/:deleteUser', async(req, res) => {
        const loggedInUserId = (req.user!.id);
        const deleteUser = parseInt(req.params.deleteUser);
        //check whether you are admin
        let adminFamilyMember = await req.familymemberRepository!.findOne({user: loggedInUserId, role: FamilyRole.Admin});
        if(!adminFamilyMember){
            return res.sendStatus(403);
        }
        //user you want to delete is member of your family
        let wantToDelete = await req.familymemberRepository!.findOne({user: deleteUser, family: adminFamilyMember.family})
        if(!wantToDelete){
            return res.sendStatus(403);
        }else if(wantToDelete.user.id !== loggedInUserId){
            await req.familymemberRepository!.nativeDelete({user: wantToDelete.user});
            return res.sendStatus(200);
        }else{
            return res.sendStatus(403);
        }
    })
    //delete all familymembers (you have to be admin)
    .delete('/delete', async(req, res) => {
        const loggedInUserId = (req.user!.id);
        //check whether you are admin
        let adminFamilyMember = await req.familymemberRepository!.findOne({user: loggedInUserId, role: FamilyRole.Admin});
        if(!adminFamilyMember){
            return res.sendStatus(403);
        }else{
            const familyId = adminFamilyMember.family.id;
            const familyMembers = await req.familymemberRepository!.find({family: adminFamilyMember.family})
            await req.familymemberRepository!.nativeDelete({family: familyMembers});
            await req.familyRepository!.nativeDelete({id: familyId});
            return res.sendStatus(200);
        }

    })
    