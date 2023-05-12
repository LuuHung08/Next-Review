export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  USER: (id: number) => `users/${id}`,
  LIST_POST: '/posts',
  AUTH_REFRESH_TOKEN: '/auth/refresh-token',
};
