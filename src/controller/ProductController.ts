import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body;
  const { storeId } = req.params;
  const product = await prisma.product.create({
    data: {
      name,
      price,
      amount,
      Store: {
        connect: {
          id: storeId,
        },
      },
    },
  });
  return res.status(201).json({ massage: "Created Product", product });
};
export const getallProducts = async (req: Request, res: Response) => {
  const Products = await prisma.product.findMany();

  return res.status(200).json({ massage: "Error: False", Products });
};
export const ProductDelete = async (req: Request, res: Response) => {
  const product = await prisma.acess.deleteMany();

  return res
    .status(200)
    .json({ massage: "Error: False! Deleted Product", product });
};
