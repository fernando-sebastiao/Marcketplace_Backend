import { Router } from "express";
import { allclientID } from "./allclientID";

const allclientIDroutes = Router();

const allclientid = new allclientID();

allclientIDroutes.get("/cliente-dados/:id", allclientid.execute);

export { allclientIDroutes };
