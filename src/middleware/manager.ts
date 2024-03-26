import type { FastifyReply, FastifyRequest } from "fastify";
import { NotAManagerError, UnauthorizedError } from "../erros/AppError";
import { decrypt } from "../lib/jose";
import { jwtPayloadSchema } from "../../types";
import { prisma } from "../clients/prisma-client";
export async function AuthManager(req: FastifyRequest, rep: FastifyReply) {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return rep.code(401).send({ message: "Token missing" });
  try {
    const decodedToken = (await decrypt(token)) as jwtPayloadSchema;
    if (!decodedToken) throw new UnauthorizedError();
    const manager = await prisma.filial.findUnique({
      where: { id: decodedToken.filialId, managerId: decodedToken.id },
    });
    if (!manager) throw new NotAManagerError();
    req.user = decodedToken;
  } catch (error) {
    console.error(error);
    rep.code(401).send({ message: "UNAUTHORIZED" });
  }
}