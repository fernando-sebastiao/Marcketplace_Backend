import { Request, Response } from "express";

import { TDocumentDefinitions } from "pdfmake/interfaces";

import fs from "node:fs";
import { printer } from "../../../clients/pdfMake-client";
import { prisma } from "../../../clients/prisma-client";
import { AppError } from "../../../erros/AppError";
import SplitId from "../../../lib/splitId";
export class pdfDriver {
    async execute(request: Request, response: Response) {
        const { managerId } = request.body;
        const ifmanagerexists = await prisma.manager.findUnique({ where: { id: managerId } });
        if (!ifmanagerexists) {
            throw new AppError("Infelizmente não conseguimos encontrá-lo! Tente novamente, obrigado!");
        }
        let filial = await prisma.filial.findUnique({
            where: {
                managerId: ifmanagerexists.id
            },
            select: {
                driver: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        nascimento: true,
                        numberBI: true,
                        createdAt: true

                    }
                }
            }
        });
        if (!filial){
            throw new AppError("Infelizmente não tem a autorização para aceder este arquivo. Obrigado!");
        }
            const body = [];

        for await (let valor of filial.driver) {
            const rows = new Array();
            console.log(filial.driver)

            rows.push(SplitId(valor.id))
            rows.push(valor.name)
            rows.push(valor.email)
            rows.push(new Date(valor.nascimento).toLocaleString());
            rows.push(valor.numberBI)
            rows.push(new Date(valor.createdAt).toLocaleString());

            body.push(rows);
        }

        const docDefinitions: TDocumentDefinitions = {
            pageSize: "A3",
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    columns: [
                        { text: "Relatório dos Motoristas\n\n", style: "header" },
                    ]
                }
                ,
                {
                    table: {
                        body: [
                            [
                                { text: "ID", style: "columnsTitle" },
                                { text: "Name", style: "columnsTitle" },
                                { text: "Email", style: "columnsTitle" },
                                { text: "Nascimento", style: "columnsTitle" },
                                { text: "NumberBI", style: "columnsTitle" },
                                { text: "CreatedAT", style: "columnsTitle" },

                            ],
                            ...body
                        ],
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    alignment: "center",
                },
                columnsTitle: {
                    fontSize: 12,
                    bold: false,
                    color: "#666666",
                    alignment: "left"
                },
                columunsBold: {
                    fontSize: 14,
                    color: "#ff0000", bold: true,
                    alignment: "center"
                },
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);
        pdfDoc.pipe(fs.createWriteStream("Relatório dos Motoristas.pdf"));
        const guardado = new Array();

        pdfDoc.on("data", (dado) => {
            guardado.push(dado);
        });
        pdfDoc.end();

        pdfDoc.on("end", () => {
            const result = Buffer.concat(guardado);
            response.end(result);
        });
    };

}