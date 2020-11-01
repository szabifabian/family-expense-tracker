import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { Balance } from "./entities/balance";
import { Family } from "./entities/family";
import { FamilyMember } from "./entities/familymember";
import { Invitation } from "./entities/invitation";
import { User as ApplicationUser } from "./entities/user";

declare global {
  namespace Express {

    interface User {
      id: number;
    }

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      userRepository?: EntityRepository<ApplicationUser>;
      familymemberRepository?: EntityRepository<FamilyMember>;
      familyRepository?: EntityRepository<Family>;
      balanceRepository?: EntityRepository<Balance>;
      invitationRepository?: EntityRepository<Invitation>;
    }
  }
}
