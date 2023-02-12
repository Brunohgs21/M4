import express, { Application } from "express";
import { startDatabase } from "./database";
import { createWorkOrder, createWorkOrderFormat, listWorkOrder } from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/work-order", createWorkOrder);

app.post("/work-order-format", createWorkOrderFormat);

app.get("/work-order", listWorkOrder);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running!");
});
