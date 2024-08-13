export const envs: Envs = {
  cloudfrontUrl: import.meta.env.VITE_CLOUDFRONT_URL,
}

type Envs = {
  cloudfrontUrl: string;
}