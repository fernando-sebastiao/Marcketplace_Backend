import { Router } from "express";
import { pdfFilial } from "./pdfFilial";

const pdffilialroutes = Router();

const pdffilias = new pdfFilial();

pdffilialroutes.get("/pdfFilias", pdffilias.execute);
export { pdffilialroutes };

