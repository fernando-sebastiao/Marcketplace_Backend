import { Router } from "express";
import { Authmanager } from "./authmanager";

const authroutes = Router()
const authmanageroutes = new Authmanager();
authroutes.post("/manager/authenticate", authmanageroutes.execute);

export { authroutes };

