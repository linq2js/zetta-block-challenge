import { createApplication } from "graphql-modules";
// graphql modules
import records from "./queries/records";
import foo from "./queries/foo";

// make sure all module instances load once
const modules = Array.from(new Set([...records, ...foo]));
const app = createApplication({ modules });

export default app;
