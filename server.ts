import { createServer, YogaInitialContext } from "@graphql-yoga/node";
import { readFileSync } from "fs";
import { join } from "path";

import { Resolvers } from "./types";

export interface GraphQLContext extends YogaInitialContext {
  specialContextValue: number;
}

const resolvers: Resolvers = {
  Query: {
    hello: (_, __, { specialContextValue }) => `world ${specialContextValue}`,
  },
};

const typeDefs = readFileSync(join(process.cwd(), "schema.graphql"), {
  encoding: "utf-8",
});

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  context: ({ request }) => ({
    request,
    specialContextValue: 31,
  }),
});

server.start().then(() => console.log("Server is running on localhost:4000"));
