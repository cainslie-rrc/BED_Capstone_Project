import swaggerJsdoc, { Options } from "swagger-jsdoc";

const serverUrl: string = 
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Capstone Project API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for Capstone Project",
        },
        servers: [
            {
                    url: serverUrl,
                    description: process.env.NODE_ENV,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"],
};

export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};