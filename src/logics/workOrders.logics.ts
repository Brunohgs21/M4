import { Request, Response } from "express";
import {
  IWorkOrderFinish,
  IWorkOrderRequest,
  WorkOrderMechanicalResult,
  WorkOrderResult,
} from "../interfaces/workOrders.interfaces";
import format from "pg-format";
import client from "./../database/config";
import { QueryConfig } from "pg";

const createWorkOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const workOrderData: IWorkOrderRequest = req.body;

  const queryString = format(
    `
        INSERT INTO
            work_orders(%I)
        VALUES(%L)
            RETURNING *;
    `,
    Object.keys(workOrderData),
    Object.values(workOrderData)
  );

  const queryResult: WorkOrderResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const listWorkOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString = `
    SELECT 
        wo.*,
        me."name",
        me."registrationNumber"
    FROM 
	    work_orders wo
    JOIN mechanics me ON wo."mechanicalId" = me."id";
    `;

  const queryResult: WorkOrderMechanicalResult = await client.query(
    queryString
  );

  return res.json(queryResult.rows);
};

const finishWorkOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const workOrderId: number = parseInt(req.params.id);
  const workOrderData: IWorkOrderFinish = req.body;
  const queryString: string = `
    UPDATE 
	    work_orders 
    SET
        "endDate" = $1,
        "status" = 'finished'
    WHERE 
	    id = $2
    RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [workOrderData.endDate, workOrderId],
  };

  const queryResult: WorkOrderResult = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

export { createWorkOrders, listWorkOrders, finishWorkOrders };
