import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    user?: jwtPayloadSchema;
    user1?: jwtPayloadSchema1;
  }
  interface FastifyInstance {
    user?: jwtPayloadSchema;
    user1?: jwtPayloadSchema1;
  }
}

export interface geoMapFilter extends decodedUserFilialIdProps {
  numberBI: string;
}

export type jwtPayloadSchema = {
  id: string;
  filialId: string;
};
export type jwtPayloadSchema1 = {
  id: string;
};

export interface decodedUserProps {
  id: string;
  filialId: string;
}

export interface decodedUserIdProps {
  id: string;
}

export interface decodedUserFilialIdProps {
  filialId: string;
}

export interface recolhaByIdProps extends decodedUserFilialIdProps {
  recolhaId: string;
}
export interface recolhaByIdCoProps {
  recolhaId: string;
}

export interface recolhaByIdCoProps {
  recolhaId: string;
}

interface clientByIdProps extends decodedUserFilialIdProps {
  id: string;
}

interface driverByIdExtendedProps extends decodedUserFilialIdProps {
  id: string;
}
interface driverByIdProps {
  driverId: string;
}
export interface deleteRecolhaProps extends decodedUserProps {
  clintId: string;
  key: string;
}
export interface deleteRecolhaCoProps extends decodedUserIdProps {
  clintId: string;
  key: string;
}

export interface deleteClientProps extends decodedUserProps {
  clintId: string;
  key: string;
}
export interface deleteAgentProps extends decodedUserProps {
  agentId: string;
  key: string;
}

export interface deleteDriverProps extends decodedUserProps {
  driverId: string;
  key: string;
}

export interface deleteAgentProps extends decodedUserProps {
  agentId: string;
  key: string;
}

export interface updateKeyProps extends decodedUserIdProps {
  antiga: string;
  nova: string;
}
