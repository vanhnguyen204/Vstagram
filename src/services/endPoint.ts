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
    getAllUser: `${baseURL}/api/auth/user/all`,
    //music
    getListMusic: `${baseURL}/api/music`,
    //story
    createStory: `${baseURL}/api/media/story`,
    getStories: `${baseURL}/api/media/story`,

    //post
    createPost: `${baseURL}/api/media/posts`,
    getPosts: `${baseURL}/api/media/posts`,

    //socket
    activeUserActivity: `${baseURL}/api/auth/user/activity`,

    //conversation - chat
    getConversations: `${baseURL}/api/chat/`,
    getListConversations: `${baseURL}/api/chat/v2/`,
    getConversationDetails: `${baseURL}/api/chat/details`,

    //reel
    getReels: `${baseURL}/api/media/reel`,
  };
};
