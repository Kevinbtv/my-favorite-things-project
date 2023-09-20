import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };
  }

  export interface VerifyPayloadType {
    sub: string;
  }
}
