import { object, string, record, any } from "zod";
import type { TypeOf } from "zod";

const createAuthTokenSchema = object({
  body: object({
    email: string().email({ message: "Not a valid email" }),
    personDetails: object({
      firstName: string().min(1),
      lastName: string().min(1),
      dob: string().date()
    })
  })
});

type CreateAuthTokenInput = TypeOf<typeof createAuthTokenSchema>;

const createCheckSchema = object({
  body: object({
    clientId: string().min(1),
    type: string().min(1),
    documentId: string().min(1),
    livePhotoId: string().min(1).optional(),
    options: record(any()).optional()
  })
});

type CreateCheckInput = TypeOf<typeof createCheckSchema>;

const getCheckSchema = object({
  params: object({
    checkId: string().min(1)
  })
});

type GetCheckInput = TypeOf<typeof getCheckSchema>;

export {
  createAuthTokenSchema,
  createCheckSchema,
  getCheckSchema
};
export type {
  CreateAuthTokenInput,
  CreateCheckInput,
  GetCheckInput
};