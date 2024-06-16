import {ProdConfig} from '../config/AxiosConfig.ts';

export default () => {
  const baseURL = ProdConfig.BASE_URL;
  return {
    baseURL: baseURL,
    //authentication
    register: `${baseURL}/api/auth/register`,
    verifyCode: `${baseURL}/api/auth/verify`,
    confirmRegisterAccount: `${baseURL}/api/auth/create-account`,
    login: `${baseURL}/api/auth/login`,
    getUserInformation: `${baseURL}/api/auth/information`,
    getListMusic: `${baseURL}/api/music`,
    createStory: `${baseURL}/api/media/story`,
  };
};
