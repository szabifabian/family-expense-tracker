import { EntityRepository, MikroORM, IDatabaseDriver } from "@mikro-orm/core";
import { FamilyRole } from "./entities/familymember";
import { User as ApplicationUser } from "./entities/user";

declare global {
  namespace Express {

    interface User {
      id: number;
    }

    interface FamilyMember {
      id: number;
    }

    interface Family {
      id: number;
    }

    interface Request {
      orm: MikroORM<IDatabaseDriver>;
      userRepository?: EntityRepository<ApplicationUser>;
      familymemberRepository?: EntityRepository<FamilyMember>;
      familyRepository?: EntityRepository<Family>;
    }
  }
}
