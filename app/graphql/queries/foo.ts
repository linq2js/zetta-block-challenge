import { createModule, gql } from "graphql-modules";

const fooModule = createModule({
  id: "foo",
  typeDefs: gql`
    type Query {
      foo: String!
    }
  `,
  resolvers: {
    Query: {
      foo: () => "foo",
    },
  },
});

const combinedModules = [fooModule];

export default combinedModules;
