import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { Book } from "./entities/test";

export default {
  entities: [Book],
  dbName: "family-expense-tracker.sqlite",
  type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;
