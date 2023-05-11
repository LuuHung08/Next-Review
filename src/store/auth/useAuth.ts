import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authAtom, IAuth } from './auth';
import { ROUTE_PATH } from '@constant/index';

export const setAuthCookies = ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  setCookie('nextToken', token);
  setCookie('refreshToken', refreshToken);
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
