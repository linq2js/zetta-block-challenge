import { createApplication } from "graphql-modules";
import records from "./queries/records";
import foo from "./queries/foo";

const app = createApplication({
  // make sure all module instances load once
  modules: Array.from(new Set([...records, ...foo])),
});

export default app;
