import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";
import app from "../../app/graphql/app";

const executor = app.createApolloExecutor();
const schema = app.schema;

const apolloServer = new ApolloServer({
  schema,
  executor,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

const handler: NextApiHandler = async (req, res) => {
  await startServer;
  const graphqlHandler = apolloServer.createHandler({
    path: "/api/graphql",
  });
  await graphqlHandler(req, res);
};

export default handler;

export const config = {
  api: { bodyParser: false },
};
