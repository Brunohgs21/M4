import { QueryConfig, QueryResult } from "pg";
import { client } from "./../../database";
import {
  IUserWithoutPassword,
  IUserResult,
  IUser,
} from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";

const retrieveUserService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };
  const queryResult: IUserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
export default retrieveUserService;
