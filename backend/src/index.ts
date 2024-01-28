import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { gqlServer } from "./graphql";
import { PrismaClient } from "@prisma/client";
const port = process.env.PORT;

export const prisma = new PrismaClient();

export const JWT_SECRET = process.env.JWT_SECRET!;

export const SALT = process.env.SALT!;

export const init = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (request, response) => {
    response.send("Hello, GraphQL!");
  });

  const createGqlServer = await gqlServer();
  app.use("/graphql", expressMiddleware(createGqlServer));

  app.listen(port, () => {
    console.log(`Running the server`);
  });

  prisma.$connect();
  console.info("Postgres: Connected");
};

init();
