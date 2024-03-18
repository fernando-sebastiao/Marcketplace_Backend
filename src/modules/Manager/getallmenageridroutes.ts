import { Router } from "express";
import { allmanagerID } from "./getallmenagerid";

const allmanageridroutes = Router();

const getallmanager = new allmanagerID();

allmanageridroutes.get("/manager-dados/:id", getallmanager.execute);
export { allmanageridroutes };
