import { QueryResult } from "pg";

interface IMechanicalRequest {
  description: string;
  registratioNumber: string;
}

interface IMechanical extends IMechanicalRequest {
  id: number;
}

type MechanicalResult = QueryResult<IMechanical>;

interface IAdressRequest {
  street: string;
  number: string;
  postalCode: string;
  complement?: string;
}

interface IAddress extends IAdressRequest {
  id: number;
}

type AddressResult = QueryResult<IAddress>;

type MechanicalAddress = IMechanical & IAdressRequest;

type MechanicalAddressResult = QueryResult<MechanicalAddress>;

export {
  IMechanicalRequest,
  IMechanical,
  MechanicalResult,
  IAddress,
  IAdressRequest,
  AddressResult,
  MechanicalAddress,
  MechanicalAddressResult,
};
