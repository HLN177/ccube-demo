import { object, string } from "zod";
import type { TypeOf } from "zod";

const createAuthTokenSchema = object({
  body: object({
    email: string().email({ message: "Not a valid email" }),
    personDetails: object({
      firstName: string(),
      lastName: string(),
      dob: string().date()
    })
  })
});

type CreateAuthTokenInput = TypeOf<typeof createAuthTokenSchema>;

export { createAuthTokenSchema };
export type { CreateAuthTokenInput };