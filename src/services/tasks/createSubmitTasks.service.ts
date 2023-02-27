import format from "pg-format";
import { IRequestSubmitTask } from "../../interfaces/tasks.interfaces";
import client from "./../../database/config";

const createSubmitTasksService = async (
  payload: IRequestSubmitTask,
  taskId: number
) => {
  payload = {
    ...payload,
    taskId,
  };
  const queryString: string = format(
    `
         INSERT INTO
             user_tasks(%I)
        VALUES
           (%L)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult = await client.query(queryString);

  return queryResult.rows[0];
};
export default createSubmitTasksService;
