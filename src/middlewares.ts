import { Request, Response, NextFunction } from "express";
import { client } from "./database";
import { QueryConfig } from "pg";
import { WorkOrderResult } from "./interfaces";

const ensureWorkOrderExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `
        SELECT
            *
        FROM
            work_orders
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: WorkOrderResult = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    return response.status(404).json({
      message: "Work order not found!",
    });
  }

  return next();
};

export { ensureWorkOrderExists };
