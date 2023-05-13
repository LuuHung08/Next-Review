export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  USER: (id: number) => `users/${id}`,
  AUTH_REFRESH_TOKEN: '/auth/refresh-token',

  //posts
  LIST_POSTS: '/posts',
};
