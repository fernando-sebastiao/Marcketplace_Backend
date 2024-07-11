declare module "swagger-jsdoc" {
  interface SwaggerDefinition {
    openapi?: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers?: Array<{
      url: string;
    }>;
  }

  interface Options {
    swaggerDefinition: SwaggerDefinition;
    apis: string[];
  }

  function swaggerJsdoc(options: Options): object;
  export = swaggerJsdoc;
}
