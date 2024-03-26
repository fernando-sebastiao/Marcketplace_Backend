import { Router } from "express";
import geral from "../all-update-and-delete/geral";
import { CreateUseVeiculoController } from "../routes/Veiculo/CreateuseVeiculoController";

const veiculoroutes = Router();

const createuseveiculocontroller = new CreateUseVeiculoController();

veiculoroutes.post("/", createuseveiculocontroller.handle);
veiculoroutes.put("/", geral.UpdateVeiculo);

export { veiculoroutes };
