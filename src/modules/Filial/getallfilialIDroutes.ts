import { Router } from "express";
import { allfilialID } from "./getalldriverID";

const allfilialidroutes = Router();
const allfilialid = new allfilialID();

allfilialidroutes.get("/filial-dados/:id", allfilialid.execute);

export { allfilialidroutes };
