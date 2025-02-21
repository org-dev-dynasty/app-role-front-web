import { InstituteService } from '@/api/services/instituteService';
import { AuthService } from '@/api/services/authService';
import { EventService } from '@/api/services/eventService';
import { ProfileService } from '@/api/services/profileService';

export const authService = new AuthService();
export const instituteService = new InstituteService(authService);
export const eventService = new EventService(authService);
export const profileService = new ProfileService(authService);
