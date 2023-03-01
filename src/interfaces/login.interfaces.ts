import { createLoginSchema } from "../schemas/login.schemas";
import { z } from "zod";

type ILoginRequest = z.infer<typeof createLoginSchema>;

export { ILoginRequest };
