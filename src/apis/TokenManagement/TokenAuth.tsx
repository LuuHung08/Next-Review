const TOKEN = 'TOKEN';

export const setToken = (item: any) => {
  localStorage.setItem(TOKEN, JSON.stringify(item));
};

export const getToken = () => {
  let val: any = localStorage.getItem(TOKEN);
  return JSON.parse(val);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};
