import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createStore = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { userId } = req.params;

  const ifuser = await prisma.user.findUnique({ where: { id: userId } });
  if (!ifuser) {
    return res
      .status(201)
      .json({ Error: false, message: "User does not exist!" });
  }

  const store = await prisma.store.create({
    data: {
      name,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return res.status(201).json({ message: "Created Store", store });
};

export const getallStore = async (req: Request, res: Response) => {
  const store = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      Product: {
        select: {
          id: true,
          name: true,
          price: true,
          amount: true,
        },
      },
    },
  });
  return res.status(200).json({ message: "Show", Error: false, store });
};
export const DeleteAllStores = async (req: Request, res: Response) => {
  const store = await prisma.store.deleteMany();

  const deletado = "Deleted Stores";
  return res.status(200).json({ message: deletado, error: false });
};
export const DeleteStore = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.store.findFirstOrThrow({ where: { id } });

  await prisma.store.delete({ where: { id } });

  const deletado = "Deleted Store";
  return res.status(200).json({ message: deletado, error: false });
};
