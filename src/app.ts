import express, { Application } from "express";
import {
  createWorkOrder,
  listWorkOrders,
  retrieveWorkOrder,
  deleteWorkOrder,
  updateWorkOrder,
} from "./logic";
import { ensureWorkOrderExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/work-order", createWorkOrder);

app.get("/work-order", listWorkOrders);

app.get("/work-order/:id", ensureWorkOrderExists, retrieveWorkOrder);

app.delete("/work-order/:id", ensureWorkOrderExists, deleteWorkOrder);

app.patch("/work-order/:id", ensureWorkOrderExists, updateWorkOrder);

app.listen(3000, () => {
  console.log("Server is running!");
});
