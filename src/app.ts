import express, { Application } from "express";

import { startDatabase } from "./database";
import {
  createMechanical,
  createMechanicalAddress,
  retrieveMechanical,
} from "./logics/mechanics.logics";
import { ensureMechanicalExists } from "./middlewares/mechanicals.middlewares";
import {
  createWorkOrders,
  finishWorkOrders,
  listWorkOrders,
} from "./logics/workOrders.logics";

const app: Application = express();
app.use(express.json());

app.post("/mechanics", createMechanical);
app.post(
  "/mechanics/:id/addresses",
  ensureMechanicalExists,
  createMechanicalAddress
);
app.get("/mechanics/:id", ensureMechanicalExists, retrieveMechanical);

app.post("/workOrders", createWorkOrders);
app.get("/workOrders", listWorkOrders);
app.patch("/workOrders/:id/finish", finishWorkOrders);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running!");
});
