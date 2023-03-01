import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  retrieveUserController,
  listUsersController,
} from "../controllers/users.controllers";
import ensureUserExistsMiddleware from "./../middlewares/ensureUserExists.middleware";
import { createUserSchema } from "../schemas/users.schemas";
import ensureDataIsValidMiddleware from "./../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "./../middlewares/ensureTokenIsValid.middleware";
import ensureIsInstructorMiddleare from "./../middlewares/ensureIsInstructor.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  createUsersController
);
userRoutes.get("/:id", ensureUserExistsMiddleware, retrieveUserController);
userRoutes.delete("/:id", ensureUserExistsMiddleware, deleteUserController);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsInstructorMiddleare,
  listUsersController
);

export default userRoutes;
