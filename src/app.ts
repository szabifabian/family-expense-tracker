import express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(
  bodyParser.json({
    limit: "50mb",
    verify(req: any, res, buf, encoding) {
      req.rawBody = buf;
    },
  })
);

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export { app };
