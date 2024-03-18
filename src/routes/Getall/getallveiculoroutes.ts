import { Router } from "express";
import { GetallveiculoController } from "../../modules/Veiculo/GetallveiculoController";

const getallveiculoroutes = Router();

const getallveiculocontroller = new GetallveiculoController();

getallveiculoroutes.get("/", getallveiculocontroller.handle);

export { getallveiculoroutes };