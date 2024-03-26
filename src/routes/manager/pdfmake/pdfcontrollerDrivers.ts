import { Router } from "express";
import { pdfDriver } from "./pdfDriver";

const pdfDriverRoutes = Router();
const pdfdriver = new pdfDriver();

pdfDriverRoutes.get("/pdfDriver", pdfdriver.execute);
export { pdfDriverRoutes };

