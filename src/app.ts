import "express-async-errors";
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import { handleErrors } from "./errors";
import taskRoutes from "./routers/tasks.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use("/tasks", taskRoutes);

app.use(handleErrors);

export default app;
