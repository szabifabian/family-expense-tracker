import express from "express";
import * as bodyParser from "body-parser";
import mikroOrmConfig from "./mikro-orm.config"
import {mikroorm} from "./mikroorm"
import { routes } from "./controllers";

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

app.use(routes)

/*app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});*/

app.get("/", (req, res) => {
  req.body = {
    "name": "Hello world"
  };
  res.send(req.body);
});

export { app };