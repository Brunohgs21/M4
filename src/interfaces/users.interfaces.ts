import { QueryResult } from "pg";
import {
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
} from "../schemas/users.schemas";
import { z } from "zod";

type IUserRequest = z.infer<typeof createUserSchema>;
type IUser = z.infer<typeof returnUserSchema>;

type IUserWithoutPassword = Omit<IUser, "password">;
type IUserResult = QueryResult<IUserWithoutPassword>;

export { IUserRequest, IUser, IUserWithoutPassword, IUserResult };
