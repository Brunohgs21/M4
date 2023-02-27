import { z } from "zod";

const createTasksSchema = z.object({
  description: z.string(),
  scoreTotal: z.number().int(),
});

const createTaskSubmitSchema = z.object({
  userId: z.number(),
  taskId: z.number().optional(),
  repository: z.string().min(20),
});

export { createTasksSchema, createTaskSubmitSchema };
