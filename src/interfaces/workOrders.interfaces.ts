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

type WorkOrderMechanicalResult = QueryResult<IWorkOrderMechanical>;

type WorkOrderResult = QueryResult<IWorkOrder>;

export {
  IWorkOrder,
  IWorkOrderRequest,
  WorkOrderResult,
  IWorkOrderMechanical,
  WorkOrderMechanicalResult,
  IWorkOrderFinish,
};
