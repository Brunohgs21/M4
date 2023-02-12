import { QueryResult } from "pg";

interface IWorkOrderRequest {
  description: string;
  mechanical: string;
  isWarranty: boolean;
  status: string;
  price: number;
}

interface IWorkOrder extends IWorkOrderRequest {
  startdate: Date;
  enddate: Date;
  id: Number;
}

type WorkOrderCreate = Omit<IWorkOrder, "id">;

type WorkOrderResult = QueryResult<IWorkOrder>;

export { IWorkOrder, IWorkOrderRequest, WorkOrderResult, WorkOrderCreate };
