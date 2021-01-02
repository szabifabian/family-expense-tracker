import express from "express";
import * as bodyParser from "body-parser";
import ormConfig from './mikro-orm.config';
import {mikroorm} from "./mikroorm"
import { routes } from "./controllers";
let cors = require('cors')

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.use(cors());

app.use(mikroorm(ormConfig))

app.use(routes)

app.get("/", (req, res) => {
  req.body = {
    "name": "Hello world"
  };
  res.send(req.body);
});

export { app };