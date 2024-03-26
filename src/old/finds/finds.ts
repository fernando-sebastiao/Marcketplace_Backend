import type { FastifyInstance } from "fastify"
import { FindUseCase } from "./find-useCase"

export async function Finds(fastify: FastifyInstance) {
    const findUseCase = new FindUseCase()
    fastify.get("/filias", async (req, reply) => {
        try {
            return reply.send(await findUseCase.filias())
        } catch (error) {
            console.error(error)
        }
    })
    fastify.get("/clients", async (req, reply) => {
        try {
            return reply.send(await findUseCase.clients())
        } catch (error) {
            console.error(error)
        }
    })
    fastify.get("/drivers", async (req, reply) => {
        try {
            return reply.send(await findUseCase.drivers())
        } catch (error) {
            console.error(error)
        }
    })
    fastify.get("/managers", async (req, reply) => {
        try {
            return reply.send(await findUseCase.managers())
        } catch (error) {
            console.error(error)
        }
    })
}