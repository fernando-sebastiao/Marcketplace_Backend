import { Router } from "express";
import geral from "../../all-update-and-delete/geral";

const filialdeleteroutes = Router();

filialdeleteroutes.delete("/filial-delete/:id_filial", geral.DeleteFilial);

export { filialdeleteroutes };
