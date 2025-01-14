import type { Request, Response } from "express";
import { CreateAuthTokenInput } from "../schemas/auth.shema";
import { createAuthToken } from "../service/auth.service";

async function createAuthTokenHandler(
  req: Request<{}, {}, CreateAuthTokenInput['body']>,
  res: Response
) {
  try {
    const input = req.body;
    const token = await createAuthToken(input);
    return res.send(token);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send(error.message);
  }
}

export { createAuthTokenHandler };