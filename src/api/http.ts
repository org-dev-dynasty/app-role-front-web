import axios from 'axios';

export const http = axios.create({
  baseURL:
    'https://79tft305ml.execute-api.sa-east-1.amazonaws.com/prod/mss-role-auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const httpRoles = axios.create({
  baseURL:
    'https://6vy38xggch.execute-api.sa-east-1.amazonaws.com/prod/mss-role-event',
});

export const httpAuth = axios.create({
  baseURL:
    'https://79tft305ml.execute-api.sa-east-1.amazonaws.com/prod/mss-role-auth',
});
