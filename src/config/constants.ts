export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const ROUTES = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  GROUPS: '/groups',
  PROFILE: '/profile',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
};