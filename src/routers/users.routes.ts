import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  retrieveUserController,
} from "../controllers/users.controllers";
import ensureUserExistsMiddleware from "./../middlewares/ensureUserExists.middleware";

const userRoutes: Router = Router();

userRoutes.post("", createUsersController);
userRoutes.get("/:id", ensureUserExistsMiddleware, retrieveUserController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, deleteUserController);

export default userRoutes;
