import express, { Application, Request, Response } from "express";
import { ids, orders } from "./database";
import { IWorkOrder, IWorkOrderRequest } from "./interfaces";
import { createWorkOrder, listWorkOrders } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/work-order", createWorkOrder);

app.get("/work-order", listWorkOrders);

app.listen(3000, () => {
  console.log("Server is running!");
});
