import { atom } from 'recoil';
import { getCookies } from 'cookies-next';
import { ENV } from '@utils/env';

const authCache = getCookies();

export interface IAuth {
  loading?: boolean;
  token: string | undefined;
  refreshToken?: string;
}

let initialAuth: IAuth = {
  loading: true,
  token: '',
  refreshToken: '',
};

if (authCache) {
  initialAuth = {
    token: authCache.nextToken,
    refreshToken: authCache.refreshToken,
  };
}

export const authAtom = atom({
  key: `${ENV.LOCAL_STORAGE_KEY}_AUTH`,
  default: {
    ...initialAuth,
  },
});
