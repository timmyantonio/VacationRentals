import express, { Express } from "express";

import { CronJob } from "cron";
import bodyParser from "body-parser";
import bookings from "./src/routes/bookings";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./src/middlewares/error-handler.middleware";
import guests from "./src/routes/guests";
import { isPhilHoliday } from "./src/utils/holiday";
import mongoose from "mongoose";
import path from "path";
import payments from "./src/routes/payments";
import swaggerDocs from "./src/utils/swagger";
import util from "./src/routes/util";

dotenv.config();

const uri =
  "mongodb+srv://timbrownazure:Basty2004@cluster0.q1ciwhg.mongodb.net/";

const app: Express = express();
const port = process.env.PORT;

// const job = new CronJob(
//   "0 0 * * * mon-fri",
//   () => {
//     isPhilHoliday(new Date()) || updatePenalty();
//   },
//   null,
//   true,
//   "Asia/Manila"
// );
// job.start();

app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/util", cors(corsOptions), util);
app.use("/api/guests", cors(corsOptions), guests);
app.use("/api/bookings", cors(corsOptions), bookings);
app.use("/api/payments", cors(corsOptions), payments);

swaggerDocs(app);

app.use("/guests", express.static(path.join(__dirname, "guests")));
app.get("/guests/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/guests/index.html"));
});

app.use("/bookings", express.static(path.join(__dirname, "bookings")));
app.get("/bookings/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/bookings/index.html"));
});

app.use("/payments", express.static(path.join(__dirname, "payments")));
app.get("/payments/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/payments/index.html"));
});

app.use(express.static(path.join(__dirname, "home")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/home/index.html"));
});

app.use(errorHandler);

mongoose
  .connect(uri, { dbName: "vacation-rental" })
  .then(() => {
    console.log("MongoDB connection established successfully");
  })

  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
