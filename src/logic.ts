import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import {
  IWorkOrder,
  IWorkOrderRequest,
  WorkOrderCreate,
  WorkOrderResult,
} from "./interfaces";

const createWorkOrder = async (
  request: Request,
  respose: Response
): Promise<Response> => {
  const orderDataRequest: IWorkOrderRequest = request.body;
  const orderData: WorkOrderCreate = {
    ...orderDataRequest,
    startdate: new Date(),
    enddate: new Date(Date.now() + 86400 * 1000),
  };

  const queryString: string = `
  INSERT INTO
    work_orders(description, mechanical, price, status, iswarranty, startdate, enddate)
  VALUES
    ($1,$2,$3,$4,$5,$6,$7)
  RETURNING *;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: Object.values(orderData),
  };

  const queryResult: WorkOrderResult = await client.query(queryConfig);
  const newWorkOrder: IWorkOrder = queryResult.rows[0];

  return respose.status(201).json(newWorkOrder);
};

const createWorkOrderFormat = async (
  request: Request,
  respose: Response
): Promise<Response> => {
  const orderDataRequest: IWorkOrderRequest = request.body;
  const orderData: WorkOrderCreate = {
    ...orderDataRequest,
    startdate: new Date(),
    enddate: new Date(Date.now() + 86400 * 1000),
  };

  const queryString: string = format(
    `
  INSERT INTO
    work_orders(%I)
  VALUES
    (%L)
  RETURNING *;
  `,
    Object.keys(orderData),
    Object.values(orderData)
  );

  const queryResult: WorkOrderResult = await client.query(queryString);
  const newWorkOrder: IWorkOrder = queryResult.rows[0];

  return respose.status(201).json(newWorkOrder);
};

const listWorkOrder = async (
  request: Request,
  respose: Response
): Promise<Response> => {
  const perPage: any =
    request.query.perPage === undefined ? 10 : request.query.perPage;
  let page: any = request.query.page === undefined ? 0 : request.query.page;

  page = page * perPage;

  const queryString: string = `
    SELECT 
	    *
    FROM 
	    work_orders
    LIMIT $1 OFFSET $2;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [perPage, page],
  };

  const queryResult: WorkOrderResult = await client.query(queryConfig);

  return respose.status(200).json(queryResult.rows);
};

const retrieveWorkOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
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

  return response.json(queryResult.rows[0]);
};

const deleteWorkOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `
    DELETE FROM
        work_orders
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  return response.status(204).send();
};

const updateWorkOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = parseInt(request.params.id);
  const orderData = Object.values(request.body);

  const queryString: string = `
      UPDATE
          work_orders
      SET
          description = $1,
          mechanical = $2,
          price = $3,
          status = $4,
          iswarranty = $5
      WHERE
          id = $6
      RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [...orderData, id],
  };

  const queryResult: WorkOrderResult = await client.query(queryConfig);

  return response.json(queryResult.rows[0]);
};

const partialUpdateWorkOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (request.body.id) {
    delete request.body["id"];
  }

  const id: number = parseInt(request.params.id);
  const orderData = Object.values(request.body);
  const orderKeys = Object.keys(request.body);

  const formatString: string = format(
    `
      UPDATE
          work_orders
      SET(%I) = ROW(%L)
      WHERE
          id = $1
      RETURNING *;
  `,
    orderKeys,
    orderData
  );

  const queryConfig: QueryConfig = {
    text: formatString,
    values: [id],
  };

  try {
    const queryResult: WorkOrderResult = await client.query(queryConfig);
    return response.json(queryResult.rows[0]);
  } catch (error) {
    return response.status(400).json({
      message: "Wrong keys!",
    });
  }
};

export {
  createWorkOrder,
  createWorkOrderFormat,
  listWorkOrder,
  retrieveWorkOrder,
  deleteWorkOrder,
  updateWorkOrder,
  partialUpdateWorkOrder,
};
