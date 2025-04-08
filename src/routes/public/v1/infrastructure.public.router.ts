import { Router } from "express";
import { infrastructureProcessing } from "../../../controllers/public/v1/infrastructure.public.controller";

const r: Router = Router();

r.post("/", infrastructureProcessing);

export default r;
