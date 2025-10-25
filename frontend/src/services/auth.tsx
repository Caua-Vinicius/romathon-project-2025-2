import type { ILogin } from '../interfaces/ILogin';
import type { IRegister } from '../interfaces/IRegister'; 
import { api } from './api';

export const Auth = {
  login: (data: ILogin) => {
    return api.post('/auth/login', data);
  },

  register: (data: IRegister) => {
    return api.post('/auth', data);
  },

  logout: () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  },
};