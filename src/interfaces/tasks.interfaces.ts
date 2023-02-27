import { z } from "zod";
import {
  createTasksSchema,
  createTaskSubmitSchema,
} from "../schemas/tasks.schemas";

type IRequestTasks = z.infer<typeof createTasksSchema>;
type IRequestSubmitTask = z.infer<typeof createTaskSubmitSchema>;

export { IRequestTasks, IRequestSubmitTask };
