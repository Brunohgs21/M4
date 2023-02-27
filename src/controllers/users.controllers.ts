import { Request, Response } from "express";
import createUsersService from "./../services/users/createUser.services";
import { IUserRequest } from "../interfaces/users.interfaces";
import retrieveUserService from "./../services/users/retrieveUser.service";
import { AppError } from "../errors";
import deleteUserService from "./../services/users/deleteUser.service";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUsersService(userData);
  return res.status(201).json(newUser);
};

const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const user = await retrieveUserService(userId);
  return res.json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  await deleteUserService(userId);
  return res.status(204).send();
};

export { createUsersController, retrieveUserController, deleteUserController };
