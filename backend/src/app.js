import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import todosRouter from "./routes/todos.routes.js";
import { environment } from "./config/env.js";

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
app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${HOST}:${PORT}`);
});
