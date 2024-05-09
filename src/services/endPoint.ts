import {ProdConfig} from '../config/AxiosConfig.ts';

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    register: `${baseURL}/api/auth/register`,
    verifyCode: `${baseURL}/api/auth/verify`,
    confirmRegisterAccount: `${baseURL}/api/auth/create-account`,
    login: `${baseURL}/api/auth/login`,
    getListMusic: `${baseURL}/api/music`,
    createStory: `${baseURL}/api/media/story`,
  };
};
