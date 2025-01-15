import axionsInstance from './axios';
import type { AuthType, Check, CreateCheckType, TokenInfo } from '@/models/auth.models';

const URL = {
  CREATE_TOKEN: '/api/createtoken',
  CREATE_CHECK: '/api/createcheck',
  GET_CHECK: '/api/getcheckresult/{checkId}',
};

const service = {
  createToken: (data: AuthType): Promise<TokenInfo> => {
    return axionsInstance.post(URL.CREATE_TOKEN, data);
  },
  createCheck: (data: CreateCheckType): Promise<Check> => {
    return axionsInstance.post(URL.CREATE_CHECK, data);
  },
  getCheck: (checkId: string): Promise<Check> => {
    return axionsInstance.get(URL.GET_CHECK.replace('{checkId}', checkId));
  }
}

export default service;
