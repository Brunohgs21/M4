import { QueryResult } from "pg";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  role: "instructor" | "student";
}

interface IUser extends IUserRequest {
  id: number;
}

type IUserWithoutPassword = Omit<IUser, "password">;
type IUserResult = QueryResult<IUserWithoutPassword>;

export { IUserRequest, IUser, IUserWithoutPassword, IUserResult };
