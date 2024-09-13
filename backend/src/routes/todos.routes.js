import { Router } from "express";
import { getAllTodos } from "../controllers/todos.controllers.js";

const router = Router();

router.get("/", getAllTodos);

const todoRouter = router;
export default todoRouter;
