export interface IWorkOrderRequest {
  description: string;
  mechanical: string;
  client: string;
  price: number;
}

export interface IWorkOrder extends IWorkOrderRequest {
  startDate: Date;
  endDate: Date;
  id: number;
}

export type WorkOrderRequiredKeys =
  | "description"
  | "mechanical"
  | "client"
  | "price";
