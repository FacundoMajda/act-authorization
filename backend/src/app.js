import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { environment } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todos.routes.js";

const app = express();
const PORT = environment.server.port;
const HOST = environment.server.host;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${HOST}:${PORT}`);
});
