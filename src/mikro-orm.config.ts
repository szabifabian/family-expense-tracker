import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Family } from "./entities/family";
import { FamilyMember } from "./entities/familymember";
import { User } from "./entities/user";

export default {
  entities: [User, FamilyMember, Family],
  dbName: "family-expense-tracker.sqlite",
  type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;