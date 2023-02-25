import express, { Application } from "express";
import userRoutes from "./routers/users.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

export default app;
