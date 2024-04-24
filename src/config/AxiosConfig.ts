import {IP_Address} from '../utils/IP_Address.ts';

export const ProdConfig = {
  BASE_URL: `http://${IP_Address}:3000`,
  SOCKET_URL: `http://${IP_Address}:8080`,
};
