import { Router } from "express";
import { alldriverID } from "./getalldriverID";

const alldriveridroutes = Router();
const alldriverid = new alldriverID();

alldriveridroutes.get("/driver-dados/:id_driver", alldriverid.execute);
export{alldriveridroutes};
