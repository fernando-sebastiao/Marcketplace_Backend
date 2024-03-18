import PdfPrinter from "pdfmake";

const fonts = {
    Helvetica:{
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    },
};
export const printer = new PdfPrinter(fonts);
