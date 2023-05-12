import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authAtom, IAuth } from './auth';
import { ROUTE_PATH } from '@constant/index';

interface TokenInfo {
  token: string;
  refreshToken: string;
}

export const setAuthCookies = (values: TokenInfo) => {
  setCookie('nextToken', values.token);
  setCookie('refreshToken', values.refreshToken);
};

export const deleteAuthCookies = () => {
  deleteCookie('nextToken');
  deleteCookie('refreshToken');
};

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const router = useRouter();
  const setAuthData = (data: IAuth): void => {
    setAuth({ ...auth, ...data });
  };

  const onLogout = () => {
    router.push(ROUTE_PATH.SIGN_IN);
    setAuthData({
      token: '',
      refreshToken: '',
    });
    deleteAuthCookies();
  };

  const onLogin = (data: IAuth) => {
    try {
      setAuthData(data);
      setAuthCookies({
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
      });
      router.push(ROUTE_PATH.HOME);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    auth,
    isLogin: !!auth?.token,
    setAuthData,
    onLogin,
    onLogout,
  };
};
