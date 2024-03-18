declare module "express"{
    interface Request{
        user?:jwtPayloadSchema
    }
}

export type jwtPayloadSchema={
    id:string;
    filialId:string;
}
