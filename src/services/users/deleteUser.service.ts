import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../errors";
import client from "./../../database/config";
const deleteUserService = async (userId: number): Promise<void> => {
  const queryStrig: string = `
    UPDATE
        users
    SET
        "isActive" = false
    WHERE
        id = $1;
  `;
  const queryConfigUpdate: QueryConfig = {
    text: queryStrig,
    values: [userId],
  };
  await client.query(queryConfigUpdate);
};

export default deleteUserService;
