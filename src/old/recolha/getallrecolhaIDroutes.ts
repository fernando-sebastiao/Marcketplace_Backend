import { Router } from "express";
import { allRecolhaID } from "./getallrecolhaID";

const allrecolhasroutes = Router();

const getallrecolhaid = new allRecolhaID();

allrecolhasroutes.get("/recolha-dados/:id", getallrecolhaid.execute);

export{allrecolhasroutes};