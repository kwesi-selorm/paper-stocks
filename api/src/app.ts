import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
