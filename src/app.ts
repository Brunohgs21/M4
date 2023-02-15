import express, { Application } from "express";

import { startDatabase } from "./database";
import {
  createMechanical,
  createMechanicalAddress,
  retrieveMechanical,
} from "./logics/mechanicals.logics";
import { ensureMechanicalExists } from "./middlewares/mechanicals.middlewares";

const app: Application = express();
app.use(express.json());

app.post("/mechanics", createMechanical);
app.post(
  "/mechanics/:id/addresses",
  ensureMechanicalExists,
  createMechanicalAddress
);
app.get("/mechanics/:id", ensureMechanicalExists, retrieveMechanical);

app.listen(3000, async () => {
  await startDatabase();
  console.log("Server is running!");
});
