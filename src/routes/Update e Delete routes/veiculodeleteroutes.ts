import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const veiculosdeleteroutes = Router();

veiculosdeleteroutes.delete("/veiculo-delete/:id_veiculo", geral.DeleteVeiculo);

export { veiculosdeleteroutes };
