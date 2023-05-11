import { useRequest } from 'ahooks';
import { API_PATH } from 'src/apis/constant';
import { request } from 'src/apis/request';

interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}
interface TypeLogin {
  username: string;
}

export const useLogin = (options: HandleEvent) => {
  return useRequest(
    async (payload: TypeLogin) => {
      return request.post(API_PATH.AUTH_LOGIN, {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
