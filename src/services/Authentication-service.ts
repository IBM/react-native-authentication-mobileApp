import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.baseUrl;

const login = async (user: any) => {
  try {
    let response = await axios.post(`${baseUrl}/user/login`, user);
    return response;
  } catch (error) {
    throw error.response.data;
  };
 
};

export default {
  login,
};
