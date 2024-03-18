import { Request, Response } from "express";

import { TDocumentDefinitions } from "pdfmake/interfaces";

import fs from "node:fs";
import { printer } from "../../../clients/pdfMake-client";
import { prisma } from "../../../clients/prisma-client";
import { AppError } from "../../../erros/AppError";
import SplitId from "../../../lib/splitId";
export class pdfFilial {
    async execute(request: Request, response: Response) {
        const { managerId, status } = request.body;
        const ifmanagerexists = await prisma.manager.findUnique({ where: { id: managerId } });
        if(!ifmanagerexists){
            throw new AppError("Lamentamos mas não conseguimos encontrá-lo. Por favor, insira outra credencial!");
        }
        const filial = await prisma.filial.findUnique({ where: { managerId: ifmanagerexists.id } });
        if(!filial){
            throw new AppError("Infelizmente não tem a permissão de aceder a estes arquivos. Por favor, insira outra credencial.");
        }
        let recolha;
        if (!status) {
            recolha = await prisma.recolhas.findMany({
                where: {
                    filial: {
                        id: filial.id
                    }
                },
                select: {
                    id: true,
                    cliente: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    driver: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    status: true,
                    createdAt: true
                }
            })
        } else {
            recolha = await prisma.recolhas.findMany({
                where: {
                    filial: {
                        id: filial.id
                    },
                    status: status
                },
                select: {
                    id: true,
                    cliente: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    driver: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    status: true,
                    createdAt: true
                }
            })
        }

        const body = [];

        for await (let valor of recolha) {
            const rows = new Array();
            console.log(recolha)
            rows.push(SplitId(valor.id))
            const client=`${valor.cliente?.name} \n\ ${valor.cliente?.id}`
            const driver=`${valor.driver?.name} \n\ ${valor.driver?.id}`
            rows.push(client)
            rows.push(driver)
            rows.push({text:valor.status, style: "columnsTitle"})
            rows.push(new Date(valor.createdAt).toLocaleString())
            body.push(rows);
        }

        const docDefinitions: TDocumentDefinitions = {
            pageSize:"A3",
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    columns: [
                        { text: "Recolhas da Filial\n\n", style: "header" },
                    ]
                }
                ,
                {
                    table: {
                        body: [
                            [
                                { text: "Id", style: "columnsTitle"},
                                { text: "Cliente", style: "columnsTitle" },
                                { text: "Motorista", style: "columnsTitle" },
                                { text: "Status", style: "columnsTitle" },
                                { text: "CreatedAt", style: "columnsTitle" },
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
                    bold:false,
                    color:"#666666",
                    alignment: "left"
                },
                columunsBold:{
                    fontSize:14,
                    color: "#ff0000",   bold:true,
                    alignment: "center"
                },
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);
        pdfDoc.pipe(fs.createWriteStream("RelatórioRecolhasFilias.pdf"));
        // pdfDoc.pipe(fs.createWriteStream("Relatório.pdf"));
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