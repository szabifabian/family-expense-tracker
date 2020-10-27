import express from "express";
import * as bodyParser from "body-parser";
import mikroOrmConfig from "./mikro-orm.config"
import {mikroorm} from "./mikroorm"

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(mikroorm(mikroOrmConfig))

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export { app };