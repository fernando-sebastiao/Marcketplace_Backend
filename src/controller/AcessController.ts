import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAcess = async (req: Request, res: Response) => {
  const { name } = req.body;
  const ifacesss = await prisma.acess.findUnique({
    where: { name },
  });
  if (ifacesss) {
    res.status(400).json({ message: "This acess already exists!" });
  }
  const acess = await prisma.acess.create({
    data: {
      name,
    },
  });
  return res.status(201).json({ massage: "Created Acess", acess });
};
export const getallAcess = async (req: Request, res: Response) => {
  const { name } = req.body;

  const acess = await prisma.acess.findMany();

  return res.status(200).json({ massage: "Error: False", acess });
};
export const acessDelete = async (req: Request, res: Response) => {
  const acess = await prisma.acess.deleteMany();

  return res.status(200).json({ massage: "Error: False", acess });
};
