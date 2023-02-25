import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id,name,email,role;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  return queryResult.rows[0];
};

export default createUsersService;
