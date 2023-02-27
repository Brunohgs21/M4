import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  retrieveUserController,
} from "../controllers/users.controllers";
import ensureUserExistsMiddleware from "./../middlewares/ensureUserExists.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import ensureDataIsValidMiddleware from "./../middlewares/ensureDataIsValid.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  createUsersController
);
userRoutes.get("/:id", ensureUserExistsMiddleware, retrieveUserController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, deleteUserController);

export default userRoutes;
