import { IAllUsersReturn } from "../../interfaces/users.interfaces";
import { client } from "../../database";

const listUsersService = async (): Promise<IAllUsersReturn> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult = await client.query(queryString);

  return queryResult.rows;
};

export default listUsersService;
