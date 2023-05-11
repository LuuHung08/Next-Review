import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { authAtom, IAuth } from './auth';
import { useProfile } from '@store/profile/useProfile';
import { ROUTE_PATH } from '@constant/index';

export const setAuthCookies = ({
  id,
  token,
  refreshToken,
  expiredTime,
}: {
  id: number;
  token: string;
  refreshToken: string;
  expiredTime: number;
}) => {
  setCookie('locamosfeId', id);
  setCookie('locamosfeToken', token);
  setCookie('locamosfeRefreshToken', refreshToken);
  setCookie('locamosfeExpiredTime', expiredTime);
};

export const deleteAuthCookies = () => {
  deleteCookie('locamosfeId');
  deleteCookie('locamosfeToken');
  deleteCookie('locamosfeRefreshToken');
  deleteCookie('locamosfeExpiredTime');
};

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const router = useRouter();
  const { requestGetProfile } = useProfile();
  const setAuthData = (data: IAuth): void => {
    setAuth({ ...auth, ...data });
  };

  const onLogout = () => {
    router.push(ROUTE_PATH.SIGN_IN);
    setAuthData({
      id: 0,
      token: '',
      refreshToken: '',
      expiredTime: 0,
    });

    deleteAuthCookies();
  };

  const onLogin = (data: IAuth) => {
    try {
      setAuthData(data);
      setAuthCookies({
        id: data.id,
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
      if (data?.id) {
        requestGetProfile.run(data?.id, () => router.push(ROUTE_PATH.HOME));
      }
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
