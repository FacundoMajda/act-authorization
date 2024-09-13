import { Router } from "express";
import { getAllTodos } from "../controllers/todos.controllers.js";
import { authenticate } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", authenticate, getAllTodos);

const todoRouter = router;
export default todoRouter;
