import { Router } from "express";
import {
    consume,
    consumeAndStore,
    consumeRaw,
} from "../../../controllers/public/v1/consumer.public.controller";

const r: Router = Router();

r.post("/consume", consume);

r.post("/consume/raw", consumeRaw);

r.post("/consume/store", consumeAndStore);

export default r;
