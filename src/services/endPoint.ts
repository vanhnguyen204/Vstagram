import { ProdConfig } from "../config/AxiosConfig.ts";

export default  () => {
  const baseURL = ProdConfig.BASE_URL
  return {
    baseURL: baseURL,
    register: `${baseURL}/api/auth/register`,
    verifyCode: `${baseURL}/api/auth/verify`
  }
}
