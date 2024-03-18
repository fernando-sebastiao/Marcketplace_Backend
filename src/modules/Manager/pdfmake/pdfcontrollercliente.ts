import { Router } from "express";
import { PDFcliente } from "./pdfcliente";

const pdfmakeclienteroutes = Router()

const pdfcliente = new PDFcliente();

pdfmakeclienteroutes.get("/pdfcliente", pdfcliente.execute);

export { pdfmakeclienteroutes };

