import { envs } from '@/utils/envs';

import eventDefaultImage from '../assets/event-default-image.png';

envs.cloudfrontUrl;

export const IMAGES = {
  logo: `${envs.cloudfrontUrl}/approle_logo_navbar.png`,
  event_default_image: eventDefaultImage,
};
