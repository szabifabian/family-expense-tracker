import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { env } from "process";
import { Balance } from "./entities/balance";
import { Family } from "./entities/family";
import { FamilyMember } from "./entities/familymember";
import { Invitation } from "./entities/invitation";
import { User } from "./entities/user";

export default {
  entities: [User, FamilyMember, Family, Balance, Invitation],
  dbName: env.NODE_ENV === 'test' ? 'family-expense-tracker.test.sqlite' : 'family-expense-tracker.sqlite',
  type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;