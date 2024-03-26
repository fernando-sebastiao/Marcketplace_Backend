import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { DriverUseCase } from "./driver-usecase";



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
