import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { AgentUseCase } from "./agent-usecase";
const agentSchema = z.object({
  name: z.string().min(10, "Min 10").max(255, "Max 255"),
  email: z.string().email("Formato invalido"),
  sexo: z.enum(["M", "F"]),
});
export type agentProps = z.infer<typeof agentSchema>;

export async function Agent(fastify: FastifyInstance) {
  const agentUseCase = new AgentUseCase();
  fastify.get("/", async (req, reply) => {
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      return reply.send(
        await agentUseCase.find({
          filialId: user.filialId,
        })
      );
    } catch (error) {
      console.error(error);
      reply.code(500).send({ message: "Erro ao buscar Agente" });
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
      return reply
        .code(200)
        .send(await agentUseCase.findById({ filialId: user.filialId, id: id }));
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.delete("/:id", async (req, reply) => {
    const { key } = z
      .object({
        key: z.string({ required_error: "A password é obrigatória" }),
      })
      .parse(req.body);
    const { id } = z
      .object({
        id: z.string({ required_error: "O id é obrigatório" }),
      })
      .parse(req.params);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      await agentUseCase.delete({
        filialId: user.filialId,
        id: user.id,
        key,
        agentId: id,
      });
      return reply.code(200).send({ message: "Agente deletado com sucesso" });
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
  fastify.post("/create", async (req, reply) => {
    const { email, name, sexo } = agentSchema.parse(req.body);
    const user = req.user;
    if (!user) return reply.code(401).send({ message: "Token invalid" });
    try {
      await agentUseCase.create({
        filialId: user.filialId,
        email,
        name,
        sexo,
      });
      return reply.code(200).send({ message: "Agente criado com sucesso!" });
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  });
}