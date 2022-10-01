import { createModule, gql } from "graphql-modules";
import fetchLinkMeta from "../../services/fetchLinkMeta";
import records from "../../services/records";

export type RecordsArgs = {
  message: string;
};

const recordsModule = createModule({
  id: "records",
  typeDefs: gql`
    type LinkMeta {
      url: String!
      title: String!
    }

    type RecordsOutput {
      mentions: [String!]!
      emoticons: [String!]!
      links: [LinkMeta!]!
    }

    type Query {
      records(message: String!): RecordsOutput
    }
  `,
  resolvers: {
    Query: {
      records: (_: unknown, args: RecordsArgs) =>
        records(args.message, { linkMetaFetcher: fetchLinkMeta }),
    },
  },
});

const combinedModules = [recordsModule];

export default combinedModules;
