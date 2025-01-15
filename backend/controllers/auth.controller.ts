import type { Request, Response } from "express";
import type { CreateAuthTokenInput, CreateCheckInput, GetCheckInput } from "../schemas/auth.shema";
import { createAuthToken, createCheck, getCheck } from "../service/auth.service";

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

async function createCheckHandler(
  req: Request<{}, {}, CreateCheckInput['body']>,
  res: Response
) {
  try {
    const input = req.body;
    const token = await createCheck(input);
    return res.send(token);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send(error.message);
  }
}

async function getCheckHandler(
  req: Request<GetCheckInput['params'], {}, {}>,
  res: Response
) {
  try {
    const { checkId } = req.params;
    const token = await getCheck(checkId);
    return res.send(token);
  } catch (error: any) {
    console.error(error);
    return res.status(409).send(error.message);
  }
}


export {
  createAuthTokenHandler,
  createCheckHandler,
  getCheckHandler
};