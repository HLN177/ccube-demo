import { ComplyCube } from "@complycube/api";

const COMPLY_CUBE_API_KEY = process.env.COMPLY_CUBE_API_KEY;

if (!COMPLY_CUBE_API_KEY) {
  throw new Error("COMPLYCUBE_API_KEY environment variable is not set");
}

const complycube = new ComplyCube({ apiKey: COMPLY_CUBE_API_KEY });

export { complycube };