import { prisma } from "./repository/prisma-repo.js";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { gqlServer } from "./graphql/index.js";
const port = process.env.PORT;
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
        console.log(`Running a server at http://localhost:${port}`);
    });
    // Prisma Connection
    prisma.$connect();
    console.info("Postgres: Connected");
};
init();
