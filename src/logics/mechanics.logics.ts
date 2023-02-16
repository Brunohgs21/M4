import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../database";
import {
  AddressResult,
  IAdressRequest,
  IMechanicalRequest,
  MechanicalAddressResult,
  MechanicalResult,
} from "../interfaces/mechanics.interfaces";

const createMechanical = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const mechanicalData: IMechanicalRequest = req.body;

    const queryString: string = format(
      `
        INSERT INTO
            mechanics (%I)
        VALUES (%L)
        RETURNING *;
    `,
      Object.keys(mechanicalData),
      Object.values(mechanicalData)
    );

    const queryResult: MechanicalResult = await client.query(queryString);

    return res.status(201).json(queryResult.rows[0]);
  } catch (error: any) {
    if (
      error.message.inlcudes("duplicate key value violates unique constraint")
    ) {
      return res.status(409).json({
        message: "Registration number already exists!",
      });
    }
    console.log(error.message);
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

const createMechanicalAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const mechanicalId: number = parseInt(req.params.id);
  const addressData: IAdressRequest = req.body;

  let queryString: string = format(
    `
        INSERT INTO
            addresses (%I)
        VALUES(%L)
        RETURNING *;
    `,
    Object.keys(addressData),
    Object.values(addressData)
  );

  let queryResult: AddressResult = await client.query(queryString);

  queryString = `
    UPDATE
      mechanics
    SET
      "addressId" = $1
    WHERE
      id = $2
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [queryResult.rows[0].id, mechanicalId],
  };

  await client.query(queryConfig);

  return res.status(201).json(queryResult.rows[0]);
};

const retrieveMechanical = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const mechanicalId: number = parseInt(req.params.id);
  const queryString = `
    SELECT 
        me.*,
        ad."street" rua,
        ad."number",
        ad."postalCode",
        ad."complement"
    FROM
        mechanics me
    JOIN
      addresses ad ON me. "addressId" = ad.id
    WHERE 
        me.id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [mechanicalId],
  };

  const queryResult: MechanicalAddressResult = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

export { createMechanical, createMechanicalAddress, retrieveMechanical };
