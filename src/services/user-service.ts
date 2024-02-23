import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.baseUrl;

const register = async (user: any) => {
  try {
    const response = await axios.post(`${baseUrl}/user`, user);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const getQuestions = async (email: string) => {
  try {
    let response = await axios.post(`${baseUrl}/user/questions`, {email});
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePassword = async (data: any) => {
  try {
    let response = await axios.post(`${baseUrl}/user/update-password`, data);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const getUser = async (userId: any) => {
  try {
    let response = await axios.get(`${baseUrl}/user/${userId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const changePassword = async (user: any) => {
  try {
    let response = await axios.post(`${baseUrl}/user/change-password`, user);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const getAllUser = async (role: string, email: string) => {
  try {
    let response = await axios.get(`${baseUrl}/user/${role}/${email}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  register,
  getQuestions,
  updatePassword,
  getUser,
  changePassword,
  getAllUser,
};
