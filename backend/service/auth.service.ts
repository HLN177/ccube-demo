import { CreateAuthTokenInput } from "../schemas/auth.shema";
import { complycube } from "../shared/complyCube";
import type { Token } from "@complycube/api/dist/resources/Tokens";

async function createAuthToken(input: CreateAuthTokenInput['body']): Promise<Token> {
  try {
    const client = await complycube.client.create({
      type: "person",
      ...input
    });
  
    const token = await complycube.token.generate(client.id, {
      referrer: "*://*/*"
    });
  
    return token;
  } catch (error) {
    console.error("Generate auth token failed", error);
    throw error;
  }
}

export { createAuthToken };