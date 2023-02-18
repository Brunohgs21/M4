import { QueryResult } from "pg";

interface IWorkOrderRequest {
  description: string;
  price: number;
  status: string;
  isWarranty: boolean;
  startDate: Date;
  endDate: Date;
  mechanicalId: number;
}

interface IWorkOrder extends IWorkOrderRequest {
  id: number;
  endDate: Date;
}

interface IWorkOrderMechanical extends IWorkOrder {
  name: string;
  registrationNumber: string;
}

interface IWorkOrderFinish {
  endDate: Date;
}

interface IWorkOrderPartsRequest {
  name: string;
  quantity: number;
}

interface IWorkOrderParts {
  id: number;
  workOrderId: number;
  partId: number;
  quantity: number;
}

type WorkOrderMechanicalResult = QueryResult<IWorkOrderMechanical>;

type WorkOrderResult = QueryResult<IWorkOrder>;

type WorkOrderPartsResult = QueryResult<IWorkOrderParts>;

export {
  IWorkOrder,
  IWorkOrderRequest,
  WorkOrderResult,
  IWorkOrderMechanical,
  WorkOrderMechanicalResult,
  IWorkOrderFinish,
  IWorkOrderPartsRequest,
  IWorkOrderParts,
  WorkOrderPartsResult,
};
