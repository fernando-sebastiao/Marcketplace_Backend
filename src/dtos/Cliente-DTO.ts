export interface ClienteDTO{
    name: string,
    numberBI: string,
    address:string,
    tel: string,
    email: string,
    nascimento: Date,
    filialId: string,
    coordenadas: number[],
    status:  "Espirado" | "Pago",
    avatar: string,
    password:string
}
export interface authclienteDTO{
    email: string,
    password: string
}