import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { DriverUseCase } from "./driver-usecase";

const createDriverSchema = z.object({
  numberBI: z
    .string()
    .min(13, "Min 13")
    .max(13, "Max 13")
    .regex(/[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/, "Número de bi invalido"),
  name: z.string().min(10, "Min 13").max(255, "Max 255"),
  avatar: z.string().optional(),
  tel: z
    .string()
    .min(9, "Min 9")
    .max(9, "Max 9")
    .regex(/9[1-5][0-9]{7}/, "Número invalido"),
  email: z.string().email("Formato invalido"),
  nascimento: z.string(),
  matricula: z
    .string()
    .min(11, "Min 11")
    .max(11, "Max 11")
    .regex(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/, "Matricula invalida"),
  sexo: z.enum(["M", "F"]),
});

export type createDriverProps = z.infer<typeof createDriverSchema>;
const updateStatuSchema = z.object({
  status: z.enum(["On", "Off"]),
});
export type updateStatusData = z.infer<typeof updateStatuSchema>;
export async function Driver(fastify: FastifyInstance) {
  const driverUseCase = new DriverUseCase();
  fastify.get("/", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await driverUseCase.find({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.get("/:id", async (req, reply) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await driverUseCase.findById({ id, filialId: user.filialId })
      );
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.get("/geo-map", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await driverUseCase.geoMap({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.post("/create", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    const { numberBI, name, tel, email, nascimento, matricula, sexo, avatar } =
      createDriverSchema.parse(req.body);
    try {
      await driverUseCase.create({
        numberBI,
        name,
        tel,
        email,
        nascimento,
        matricula,
        sexo,
        avatar,
        filialId: user.filialId,
      });
      reply.code(201).send({ message: "Motorista criado com sucesso" });
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.delete("/:id", async (req, reply) => {
    const { key } = z
      .object({
        key: z.string(),
      })
      .parse(req.body);
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      await driverUseCase.delete({
        filialId: user.filialId,
        id: user.id,
        key,
        driverId: id,
      });
      return reply
        .code(200)
        .send({ message: "Motorista apagado com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.patch("/:id/update-status", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    const { status } = updateStatuSchema.parse(req.body);
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params);
    try {
      await driverUseCase.updateStatus({
        filialId: user.filialId,
        status,
        id,
      });
      return reply.code(200).send({ message: "Status atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
}
