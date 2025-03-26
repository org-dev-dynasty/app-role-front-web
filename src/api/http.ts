import axios from 'axios';
import { envs } from '../utils/envs';

export const apiInstance = axios.create({
  baseURL: envs.api,
});
