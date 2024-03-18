import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const recolhadeleteroutes = Router();

recolhadeleteroutes.delete("/recolha-delete/:id_recolha", geral.DeleteRecolha);

export { recolhadeleteroutes };
