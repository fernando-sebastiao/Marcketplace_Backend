import { fakerPT_BR as faker } from "@faker-js/faker"
import { prisma } from "../../src/clients/prisma-client";
interface seedFullProps {
  clients: number;
  drivers: number;
}
const filias = [
  {
    name: `Camama 2 ${faker.location.state({
      abbreviated: true,
    })}`,
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "camama@mukumbo.dev",
    coordenadas: [-8.841198, 13.295715],
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
  },
  {
    name: `Golf 2 ${faker.location.state({
      abbreviated: true,
    })}`,
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "golf2@mukumbo.dev",
    coordenadas: [-8.888436, 13.240898],
  },
  {
    name: "Vila alice",
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: "vilaalice@mukumbo.dev",
    coordenadas: [-8.825587, 13.247704],
  },
];
export async function seedFull({
  clients: clientsLength,
  drivers: driversLength,
}: seedFullProps) {
  enum sexo {
    masculino = "M",
    feminino = "F",
  }


  for (const filial of filias) {
    const sex = faker.helpers.enumValue(sexo);
    const firstName = faker.person.firstName(sex === "M" ? "male" : "female");
    const lastName = faker.person.lastName(sex === "M" ? "male" : "female");
    const CurrentManager = {
      name: faker.person.fullName({
        firstName,
        lastName,
      }).toLocaleLowerCase(),
      email: faker.internet.email({
        firstName,
        lastName,
        provider: "mukumbo.dev",
      }).toLocaleLowerCase(),
      sexo: sex,
    };

    await prisma.filial.create({
      data: {
        name: filial.name,
        tel: filial.tel,
        address: filial.address,
        email: filial.email,
        coordenadas: filial.coordenadas,
        agents: {
          create: Array.from({ length: 4 }).map((a) => {
            const sex = faker.helpers.enumValue(sexo);
            const firstName = faker.person.firstName(
              sex === "M" ? "male" : "female",
            );
            const lastName = faker.person.lastName(
              sex === "M" ? "male" : "female",
            );
            const currentAgent = {
              name: faker.person.fullName({
                firstName,
                lastName,
              }),
              email: faker.internet.email({
                firstName,
                lastName,
                provider: "mukumbo.dev",
              }),
              sexo: sex,
            };
            return {
              name: currentAgent.name,
              email: currentAgent.email,
              sexo: currentAgent.sexo,
              tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
              avatar: faker.image.avatar(),
            };
          }),
        },
        clients: {
          create: Array.from({ length: clientsLength }).map((c) => {
            const sex = faker.helpers.enumValue(sexo);
            const firstName = faker.person.firstName(
              sex === "M" ? "male" : "female",
            );
            const lastName = faker.person.lastName(
              sex === "M" ? "male" : "female",
            );
            const Currentclient = {
              name: faker.person.fullName({
                firstName,
                lastName,
              }),
              email: faker.internet.email({
                firstName,
                lastName,
                provider: "mukumbo.dev",
              }),
              sexo: sex,
            };
            return {
              name: Currentclient.name,
              email: Currentclient.email,
              sexo: Currentclient.sexo,
              address: faker.location.streetAddress({
                useFullAddress: true,
              }),
              coordenadas: faker.location.nearbyGPSCoordinate({
                origin: [filial.coordenadas[0], filial.coordenadas[1]],
              }),
              tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
              numberBI: faker.helpers.fromRegExp(
                /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
              ),
              nascimento: faker.date.past({ years: 30 }),
              avatar: faker.image.avatar(),
            };
          }),
        },
        drivers: {
          create: Array.from({ length: driversLength }).map((d) => {
            const sex = faker.helpers.enumValue(sexo);
            const firstName = faker.person.firstName(
              sex === "M" ? "male" : "female",
            );
            const lastName = faker.person.lastName(
              sex === "M" ? "male" : "female",
            );
            const currentDriver = {
              name: faker.person.fullName({
                firstName,
                lastName,
              }),
              email: faker.internet.email({
                firstName,
                lastName,
                provider: "mukumbo.dev",
              }),
              sexo: sex,
            };
            return {
              name: currentDriver.name,
              email: currentDriver.email,
              sexo: currentDriver.sexo,
              coordenadas: faker.location.nearbyGPSCoordinate({
                origin: [filial.coordenadas[0], filial.coordenadas[1]],
              }),
              tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
              numberBI: faker.helpers.fromRegExp(
                /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
              ),
              nascimento: faker.date.past({ years: 30 }),
              avatar: faker.image.avatar(),
              veiculo: {
                create: {
                  matricula: faker.helpers
                    .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
                    .toUpperCase(),
                },
              },
            };
          }),
        },
        manager: {
          create: {
            name: CurrentManager.name,
            email: CurrentManager.email,
            tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
            avatar: faker.image.avatar(),
            sexo: CurrentManager.sexo,
          },
        },
      },
    });
  }
  console.log("Clients and drivers seeded")
}
