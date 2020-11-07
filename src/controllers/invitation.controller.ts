import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Family } from "../entities/family";
import { FamilyMember, FamilyRole } from "../entities/familymember";
import { Invitation, Status } from "../entities/invitation";
import { User } from "../entities/user";

export const invitationRouter = Router();

invitationRouter
    .use((req,res,next) => {
        req.userRepository = req.orm.em.getRepository(User);
        req.familyRepository = req.orm.em.getRepository(Family);
        req.familymemberRepository = req.orm.em.getRepository(FamilyMember);
        req.invitationRepository = req.orm.em.getRepository(Invitation);
        next();
    })
    //send invitation
    .post('/send', async (req, res) => {
        const loggedInUserId = req.user!.id;
        const {invited_user} = req.body; //in request body you have to add the invited_user's unique_code

        let adminFamilyMember = await req.familymemberRepository!.findOne({user: loggedInUserId, role: FamilyRole.Admin});
        if(!adminFamilyMember){
            return res.sendStatus(403); //Forbidden: only admin user can send invitation
        }else{
            let invitedUser = await req.userRepository!.findOne({unique_code: invited_user});
            if(!invitedUser){
                return res.sendStatus(400); //Bad request: invited user's unique_code is invalid
            }else{
                //check whether the invitedUser is already  a familymember
                let isAlreadyFamilyMember = await req.familymemberRepository!.findOne({user: invitedUser.id});
                if(isAlreadyFamilyMember){
                    return res.sendStatus(403); //Forbidden
                }else{
                    const invitation = new Invitation();
                    const invitedUserName = invitedUser.username;
                    wrap(invitation).assign({invited_user: invitedUserName, status: Status.Pending, invitedBy: loggedInUserId}, {em: req.orm.em});
                    await req.invitationRepository!.persistAndFlush(invitation)
                    return res.sendStatus(200);
                }
            }
        }       
    })

    .put('/accept/:from', async (req, res) =>{
        const loggedInUserId = req.user!.id;
        const from = parseInt(req.params.from); //invited_by_id

        let alreadyFamilyMember = await req.familymemberRepository!.findOne({user: loggedInUserId})
        if(alreadyFamilyMember){ //you are already a family member
            return res.sendStatus(403);
        }else{
            let user = await req.userRepository!.findOne({id: loggedInUserId});
            const pendingInvitations = await req.invitationRepository!.find({invited_user: user!.username, status: Status.Pending})
            if(pendingInvitations.length === 0){ //you don't have invitations
                return res.sendStatus(404);
            }else{
                const invitationFrom = await req.familymemberRepository!.findOne({user: from});
                if(!invitationFrom){ //you don't have invitation from this user
                    return res.sendStatus(404);
                }else{
                    await req.invitationRepository!.nativeUpdate({invited_user: user!.username, status: Status.Pending, invitedBy: from}, {status: Status.Accepted});
                    let newFamilyMember = new FamilyMember();
                    wrap(newFamilyMember).assign({role: FamilyRole.User, user: loggedInUserId, family: invitationFrom!.family}, {em: req.orm.em});
                    await req.familymemberRepository!.persistAndFlush(newFamilyMember);
                    return res.sendStatus(200);
                }
            }
        }
    })

    //decline an invitation
    .put('/decline/:from', async (req, res) => {
        const loggedInUserId = req.user!.id;
        const from = parseInt(req.params.from); //invited_by_id
        let user = await req.userRepository!.findOne({id: loggedInUserId});

        const pendingInvitations = await req.invitationRepository!.find({invited_user: user!.username, status: Status.Pending})
        if(pendingInvitations.length === 0){ //you don't have invitations
            return res.sendStatus(404);
        }else{
            const invitationFrom = await req.familymemberRepository!.findOne({user: from});
            if(!invitationFrom){ //you don't have invitation from this user
                return res.sendStatus(404);
            }else{
                await req.invitationRepository!.nativeUpdate({invited_user: user!.username, status: Status.Pending, invitedBy: from}, {status: Status.Declined});
                return res.sendStatus(200);
            }
        }
    })