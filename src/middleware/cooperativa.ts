import type { FastifyReply, FastifyRequest } from "fastify";
import {
  NotAManagerError,
  NotASupperManagerrError,
  UnauthorizedError,
} from "../erros/AppError";
import { decrypt } from "../lib/jose";
import { jwtPayloadSchema1 } from "../../types";
import { prisma } from "../clients/prisma-client";
export async function AuthCooperativa(req: FastifyRequest, rep: FastifyReply) {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return rep.code(401).send({ message: "Token missing" });
  try {
    const decodedToken = (await decrypt(token)) as jwtPayloadSchema1;
    if (!decodedToken) throw new UnauthorizedError();
    const manager = await prisma.manager.findUnique({
      where: {
        id: decodedToken.id,
          role: "superGerente",
      },
    });
    if (!manager) throw new NotASupperManagerrError();
    req.user1 = decodedToken;
  } catch (error) {
    console.error(error);
    rep.code(401).send({ message: "UNAUTHORIZED" });
  }
}
