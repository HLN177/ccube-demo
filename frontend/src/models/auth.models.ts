import { object, string, TypeOf } from "zod";
import i18n from "../shared/i18n";

const createAuthModel = () =>
  object({
    email: string()
      .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.email") }) })
      .email({ message: i18n.t("message.invalid_email") }),
    personDetails: object({
      firstName: string()
        .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.first_name") }) }),
      lastName: string()
        .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.last_name") }) }),
      dob: string()
        .min(1, { message: i18n.t("message.required", { prop: i18n.t("name.date_of_birth") }) })  
    })
  });

type AuthType = TypeOf<ReturnType<typeof createAuthModel>>;

type TokenInfo = {
  token: string;
  clientId: string
};

type CreateCheckType = {
  type: string;
  clientId: string;
  documentId: string;
  options?: Record<string, any> | undefined;
  livePhotoId?: string | undefined;
};


type Check = {
  id: string;
  clientId: string;
  entityName: string;
  type: string;
  enableMonitoring?: boolean | null;
  documentId?: string | null;
  livePhotoId?: string | null;
  liveVideoId?: string | null;
  options?: object | null;
  clientConsent?: boolean | null;
  lastActionBy?: string | null;
  status: string;
  result?: string | null;
};

export {
  createAuthModel
};

export type {
  AuthType,
  TokenInfo,
  CreateCheckType,
  Check
};