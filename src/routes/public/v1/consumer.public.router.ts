import { Router } from "express";
import { consume } from "../../../controllers/public/v1/consumer.public.controller";

const r: Router = Router();

r.post("/consume", consume);

export default r;
