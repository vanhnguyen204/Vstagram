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
    //music
    getListMusic: `${baseURL}/api/music`,
    //story
    createStory: `${baseURL}/api/media/story`,
    getStories: `${baseURL}/api/media/story`,
  };
};
