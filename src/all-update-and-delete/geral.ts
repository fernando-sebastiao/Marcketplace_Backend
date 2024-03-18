import { Request, Response } from "express";
import { prisma } from "../clients/prisma-client";
import { AppError } from "../erros/AppError";

export default {
  async UpdateCliente(request: Request, response: Response) {
    const { id, name, tel, address, avatar} = request.body;

    await prisma.cliente.findFirstOrThrow({ where: { id } });
    //actualizando o cliente
    const dadoscliente = await prisma.cliente.update({
      where: {
        id
      },
      data: {
        name,
        address,
        tel,
        avatar
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Cliente actualizado com sucesso",
      dadoscliente
    });
  },
  async DeleteClient(request: Request, response: Response) {
    const { id } = request.params;
    const ifexists = await prisma.cliente.findFirst({ where: { id } });
    if (!ifexists) {
      throw new AppError("This Client does not exists");
    }
    //Fazer o delete
    const cliente = await prisma.cliente.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Cliente Deletado com sucesso",
      cliente
    });
  },
  async UpdateFilial(request: Request, response: Response){
   const {id,name, address, tel} = request.body;
   
    await prisma.filial.findFirstOrThrow({where:{id}});

   //Fazer o update da filial
   const filial = await prisma.filial.update({
    where:{
      id
    },
    data:{
      name,
      address,
      tel

    }
   });
   return response.json({
    Error: false,
    message:"Sucesso: Filial actualizada com sucesso!",
    filial
   });
  },
  async DeleteFilial(request: Request, response: Response) {
    const { id} = request.params;
    await prisma.filial.findFirstOrThrow({ where: {id} });
    //Fazer o delete
    const filial = await prisma.filial.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Filial Deletada com sucesso",
      filial
    });
  },
  async UpdateManager(request: Request, response: Response){
    const {id,name,tel,email} = request.body;
    
    await prisma.manager.findFirstOrThrow({where:{id}});
 
    //Fazer o update da filial
    const manager = await prisma.manager.update({
     where:{
       id
     },
     data:{
       name,
       tel,
       email
     }
    });
    return response.json({
     Error: false,
     message:"Sucesso: Manager actualizado com sucesso!",
     manager
    });
   },
  async DeleteManager(request: Request, response: Response) {
    const { id } = request.params;
    await prisma.manager.findFirst({ where: {id} });
    //Fazer o delete
    const manager = await prisma.manager.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Manager Deletado com sucesso",
      manager
    });
  },
  //À partir daqui criar as rotas Delete e Update
  async UpdateDriver(request: Request, response: Response){
    const {id, name,email,tel,avatar} = request.body;
    
    await prisma.driver.findFirstOrThrow({where:{id}});
 
    //Fazer o update da filial
    const driver = await prisma.driver.update({
     where:{
       id
     },
     data:{
       name,
       tel,
       avatar,
       email,
     }
    });
    return response.json({
     Error: false,
     message:"Sucesso: Driver actualizado com sucesso!",
     driver
    });
   },
  async DeleteDriver(request: Request, response: Response) {
    const { id } = request.params;
    await prisma.driver.findFirst({ where: {id} });
    //Fazer o delete
    const driver = await prisma.driver.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Driver Deletado com sucesso",
      driver
    });
  },
  async UpdateVeiculo(request: Request, response: Response){
    const {id,  matricula} = request.body;
    
    await prisma.veiculo.findFirstOrThrow({where:{id}});
 
    //Fazer o update da filial
    const driver = await prisma.veiculo.update({
     where:{
       id
     },
     data:{
      matricula
     }
    });
    return response.json({
     Error: false,
     message:"Sucesso: Veiculo actualizado com sucesso!",
     driver
    });
   },
  async DeleteVeiculo(request: Request, response: Response) {
    const { id } = request.params;
   await prisma.veiculo.findFirstOrThrow({ where: {id} });
    //Fazer o delete
    const veiculo = await prisma.veiculo.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Veiculo Deletado com sucesso",
      veiculo
    });
  },
  
  async UpdateRecolha(request: Request, response: Response){
    const {id, status} = request.body;
    
 await prisma.recolhas.findFirstOrThrow({where:{id}});
 
    //Fazer o update da filial
    const recolha = await prisma.recolhas.update({
     where:{
       id
     },
     data:{
       status
     }
    });
    return response.json({
     Error: false,
     message:"Sucesso: Recolha actualizada com sucesso!",
     recolha
    });
   },
   
  async DeleteRecolha(request: Request, response: Response) {
    const { id } = request.params;
    const ifexists = await prisma.recolhas.findFirst({ where: {id} });
    if (!ifexists) {
      throw new AppError("This Recolha does not exists");
    }
    //Fazer o delete
    const recolha = await prisma.recolhas.delete({
      where: {
        id
      }
    });
    return response.json({
      Error: false,
      message: "Sucesso: Recolha Deletada com sucesso",
      recolha
    });
  },
  
}