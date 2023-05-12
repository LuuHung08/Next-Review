import { useRequest } from 'ahooks';
import { API_PATH } from 'src/apis/constant';
import { privateRequest, request } from 'src/apis/request';

interface HandleEvent {
  onSuccess: (r: any) => void;
  onError: (r: any) => void;
}

interface ListPost {
  page: number;
  title?: string;
  tags?: string;
}

export const useGetListPost = (options?: HandleEvent) => {
  return useRequest(
    async (params: ListPost) => {
      return privateRequest(request.get, API_PATH.LIST_POST, {
        params,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
