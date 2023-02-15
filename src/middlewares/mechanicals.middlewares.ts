import { Request, Response, NextFunction } from "express";
import { client } from "../database";
import { QueryConfig } from "pg";

const ensureMechanicalExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const mechanicalId: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
        COUNT(*)
    FROM
        mechanics
    WHERE
        id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [mechanicalId],
  };

  const queryResult = await client.query(queryConfig);

  if (Number(queryResult.rows[0].count) > 0) {
    return next();
  }

  return res.status(404).json({
    message: "Mechanical not exists!",
  });
};

export { ensureMechanicalExists };
