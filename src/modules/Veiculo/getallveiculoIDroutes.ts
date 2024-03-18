import { Router } from "express";
import { allveiculoID } from "./getallveiculoID";

const allveiculoidroutes = Router();

const getallveiculosid = new allveiculoID();

allveiculoidroutes.get("/veiculo-dados/:id", getallveiculosid.execute);
export{allveiculoidroutes};