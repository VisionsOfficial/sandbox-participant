import { Router } from "express";
import {
    logout,
    refreshUserSession,
} from "../../../controllers/private/v1/auth.private.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const r: Router = Router();

r.get("/me", authenticate, refreshUserSession);
r.delete("/logout", logout);

export default r;
