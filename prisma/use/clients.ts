import { fakerPT_BR as faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { sexo } from "./full.seed";
import { prisma } from "../../src/clients/prisma-client";
// Spell:ignore Currentclient
interface seedClientsProps {
  client: number;
}

enum ClientRole {
  residencial = "residencial",
  comercial = "comercial",
}

export async function seedClients({
  clients: clientsLength,
}: { clients:number }) {
  const filias=await prisma.filial.findMany()
  for (const filial of filias) {

    const agents=await prisma.agents.findMany({
      where:{
        filialId:filial.id
      }
    })
    Array.from({ length:clientsLength }).map(async (e)=>{
      const sex = faker.helpers.enumValue(sexo);
      const firstName = faker.person.firstName(sex === "M" ? "male" : "female");
      const lastName = faker.person.lastName(sex === "M" ? "male" : "female");
      const Currentclient = {
        name: faker.person
          .fullName({
            firstName,
            lastName,
          })
          .toLocaleLowerCase(),
        email: faker.internet
          .email({
            firstName,
            lastName,
            provider: "mukumbo.dev",
          })
          .toLocaleLowerCase(),
        sexo: sex,
      };
    await prisma.payment.create({
      data:{
        endAt: dayjs().add(1, "month").startOf("day").toDate(),
        agentId: faker.helpers.arrayElement(agents).id,
        Client:{
          create:{
            name: Currentclient.name,
            email: Currentclient.email,
            sexo: Currentclient.sexo,
            address: faker.location.streetAddress({
              useFullAddress: true,
            }),
            filialId: filial.id,
            role: faker.helpers.enumValue(ClientRole),
            coordenadas: faker.location.nearbyGPSCoordinate({
              origin: [filial.coordenadas[0], filial.coordenadas[1]],
            }),
            tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
            numberBI: faker.helpers.fromRegExp(
              /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/
            ),
            nascimento: faker.date.past({ years: 30 }),
            avatar: faker.image.avatar(),
          }
        }
      }
    })
    })
  }
  console.log("Clients seeded");
}