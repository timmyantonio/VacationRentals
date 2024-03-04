import { Express, Request, Response } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";
import jsonSchema from "../schema/swagger/serviceSchema.json";

const option: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hiram API Docs",
      version,
    },
  },
  apis: ["./src/routes/*.ts"],
};

const spec = swaggerJsDoc(option);
const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(jsonSchema, spec));
  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-type", "application/json");
    res.send(spec);
  });
};

export default swaggerDocs;
