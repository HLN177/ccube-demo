import { CreateAuthTokenInput, CreateCheckInput } from "../schemas/auth.shema";
import { complycube } from "../shared/complyCube";
import type { Token } from "@complycube/api/dist/resources/Tokens";
import type { Check } from "@complycube/api";

async function createAuthToken(input: CreateAuthTokenInput['body']): Promise<{ token: Token, clientId: string}> {
  try {
    const client = await complycube.client.create({
      type: "person",
      ...input
    });
  
    const token = await complycube.token.generate(client.id, {
      referrer: "*://*/*"
    });
  
    return {
      token,
      clientId: client.id
    };
  } catch (error) {
    console.error("Generate auth token failed", error);
    throw error;
  }
}

async function createCheck(input: CreateCheckInput['body']): Promise<Check> {
  try {
    return await complycube.check.create(input.clientId, {
      type: input.type,
      documentId: input.documentId,
      ...(input.livePhotoId !== undefined && {
        livePhotoId: input.livePhotoId
      }),
      ...(input.options !== undefined && {
        options: input.options
      }),
    });
  } catch (error) {
    console.error("Complycube Create Check failed", error);
    throw error;
  }
}

async function getCheck(checkId: string): Promise<Check> {
  try {
    return await complycube.check.get(checkId);
  } catch (error) {
    console.error("Complycube Get Check failed", error);
    throw error;
  }
}

export {
  createAuthToken,
  createCheck,
  getCheck
};