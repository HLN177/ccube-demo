import { object, string, TypeOf } from "zod";
import i18n from "../shared/i18n";

const createAuthModel = () =>
  object({
    email: string()
      .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.email") }) })
      .email({ message: i18n.t("message.invalid_email") }),
    firstName: string()
      .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.first_name") }) }),
    lastName: string()
      .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.last_name") }) }),
    dob: string()
      .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.date_of_birth") }) })
  });

type AuthType = TypeOf<ReturnType<typeof createAuthModel>>;


export {
  createAuthModel
};

export type {
  AuthType
};