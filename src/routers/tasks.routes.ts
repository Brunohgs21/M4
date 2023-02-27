import { Router } from "express";
import {
  createSubmitTasksController,
  createTasksController,
} from "../controllers/tasks.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  createTasksSchema,
  createTaskSubmitSchema,
} from "../schemas/tasks.schemas";

const taskRoutes: Router = Router();

taskRoutes.post(
  "",
  ensureDataIsValidMiddleware(createTasksSchema),
  createTasksController
);
taskRoutes.post(
  "/:id/submit",
  ensureDataIsValidMiddleware(createTaskSubmitSchema),
  createSubmitTasksController
);

export default taskRoutes;
