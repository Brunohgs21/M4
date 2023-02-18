import { Request, Response } from "express";
import {
  IWorkOrderFinish,
  IWorkOrderPartsRequest,
  IWorkOrderRequest,
  WorkOrderMechanicalResult,
  WorkOrderPartsResult,
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

const createPartsInWorkOrder = async (req: Request, res: Response) => {
  const workOrderId: number = parseInt(req.params.id);
  const workOrderPartsData: IWorkOrderPartsRequest = req.body;

  let queryString: string = `
    SELECT
        *
    FROM
        parts
    WHERE
        name = $1;
  `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [workOrderPartsData.name],
  };

  const queryResultParts = await client.query(queryConfig);
  if (queryResultParts.rowCount === 0) {
    res.status(404).json({
      message: "Part not found!",
    });
  }
  if (queryResultParts.rows[0].quantityInStock < workOrderPartsData.quantity) {
    return res.status(400).json({
      message: "Out of stock, not enough parts",
    });
  }

  queryString = `
    INSERT INTO
        work_order_parts("workOrderId", "partId", "quantity")
    VALUES
        ($1,$2,$3)
    RETURNING *;
  `;

  queryConfig = {
    text: queryString,
    values: [
      workOrderId,
      queryResultParts.rows[0].id,
      workOrderPartsData.quantity,
    ],
  };

  const queryResultWorkOrderParts: WorkOrderPartsResult = await client.query(
    queryConfig
  );

  queryString = `
    UPDATE
        parts
    SET
        "quantityInStock" = $1
    WHERE
        id = $2;
  `;

  queryConfig = {
    text: queryString,
    values: [
      queryResultParts.rows[0].quantityInStock - workOrderPartsData.quantity,
      queryResultParts.rows[0].id,
    ],
  };

  await client.query(queryConfig);

  return res.status(201).json(queryResultWorkOrderParts.rows[0]);
};

const listWorkOrdersParts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const workOrderId: number = parseInt(req.params.id);
  const queryString = `
  SELECT 	
      wo.*,
      pa."name",
      pa."price" "partPrice"
  FROM
      work_order_parts wop
  JOIN 
      work_orders wo ON wop."workOrderId" = wo."id"
  JOIN 
      parts pa ON wop."partId" = pa."id"
  WHERE 
      wo."id" = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [workOrderId],
  };

  const queryResult = await client.query(queryConfig);

  return res.json(queryResult.rows);
};

export {
  createWorkOrders,
  listWorkOrders,
  finishWorkOrders,
  createPartsInWorkOrder,
  listWorkOrdersParts,
};
