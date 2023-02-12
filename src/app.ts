import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createWorkOrder,
  createWorkOrderFormat,
  deleteWorkOrder,
  listWorkOrder,
  retrieveWorkOrder,
  updateWorkOrder,
} from "./logic";
import { ensureWorkOrderExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/work-order", createWorkOrder);

app.post("/work-order-format", createWorkOrderFormat);

app.get("/work-order", listWorkOrder);

app.get("/work-order/:id", ensureWorkOrderExists, retrieveWorkOrder);

app.delete("/work-order/:id", ensureWorkOrderExists, deleteWorkOrder);

app.put("/work-order/:id", ensureWorkOrderExists, updateWorkOrder);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running!");
});
