import { Request, Response } from "express";
import createTaskService from "./../services/tasks/createTasks.service";
import createSubmitTasksService from "./../services/tasks/createSubmitTasks.service";

const createTasksController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newTask = await createTaskService(req.body);
  return res.status(201).json(newTask);
};

const createSubmitTasksController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newSubmission = await createSubmitTasksService(
    req.body,
    parseInt(req.params.id)
  );
  return res.status(201).json(newSubmission);
};

export { createSubmitTasksController, createTasksController };
