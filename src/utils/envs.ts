export const envs = {
  cloudfrontUrl: import.meta.env.VITE_CLOUDFRONT_URL as string,
  googleMapsUrl: import.meta.env.VITE_GOOGLEMAPS_URL as string,
  api: import.meta.env.VITE_API_URL as string,
};

export const createTokenName = (tokenName: string) => {
  return `${import.meta.env}_${tokenName}`;
};
