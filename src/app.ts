import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routers/index.router";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://192.168.1.5:5173", "http://localhost:5173"] }));

app.use("/", indexRouter);

export { app };
