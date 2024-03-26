import { Driver } from "@prisma/client";
import { prisma } from "../../clients/prisma-client";

export class GetallDriver{
    async execute():Promise<Driver[]>{
        const driver = prisma.driver.findMany({
            orderBy:{
                name: "desc"
            },
            include:{
                filial:{
                    select:{
                        id:true
                    }
                },
                veiculo:{
                    select:{
                        id:true
                    }
                }
            }
        });
        return driver;
    }
}