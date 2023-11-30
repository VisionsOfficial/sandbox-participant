import { Router } from "express";
import { logout } from "../../../controllers/private/v1/auth.private.controller";

const r: Router = Router();

r.delete("/logout", logout);

export default r;
