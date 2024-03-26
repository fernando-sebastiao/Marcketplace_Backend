import { Router } from "express";
import { Authdriver } from "./authdriver";

const AuthDriverRoutes = Router();
const authdriver = new Authdriver();
AuthDriverRoutes.post("/driver/authenticate", authdriver.execute);
export { AuthDriverRoutes };

