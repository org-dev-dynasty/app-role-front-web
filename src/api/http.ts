import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://p6e3nad7dy2i6jj6djsmna32da0jvqrk.lambda-url.sa-east-1.on.aws',
  headers: {
    'Content-Type': 'application/json',
  }
})