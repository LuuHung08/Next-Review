import { extend } from 'umi-request';
import { ENV } from 'src/utils/env';
import TokenManagement from './TokenManagement';
import jwtDecode from 'jwt-decode';
import { getCookies } from 'cookies-next';

const REQ_TIMEOUT = 25 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export const PREFIX_API = ENV.APP_API_URL;

const request = extend({
  prefix: PREFIX_API,
  timeout: REQ_TIMEOUT,
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

const injectBearer = (token: string, configs: any) => {
  if (!configs) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    ...configs,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAccessToken = () => {
  const localInfoObject = getCookies();
  return localInfoObject.nextToken;
};

const TokenManager = new TokenManagement({
  isTokenValid: () => {
    try {
      let decoded: any;
      const token = getAccessToken();
      if (token) {
        decoded = jwtDecode(token);
      }
      const { exp } = decoded;

      const currentTime = Date.now() / 1000;

      if (exp - 5 > currentTime) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }

    // // check token sap expired truoc' 5s
    // // dayjs token.exp < now.subtract(30s) => multiple request private1 private2 private3 => 3 lan refresh token
    // return false goi den ham onRefreshToken
    // return true => cho phep' lay' token cu~
  },
  getAccessToken: () => {
    const token = getAccessToken();
    return `${token}`;
  },
  onRefreshToken(done) {
    const localInfo = getCookies();
    const refreshToken = localInfo?.refreshToken;
    if (!refreshToken) {
      return done(null);
    }
    request
      .post('/auth/refresh-token', {
        data: {
          refreshToken,
        },
      })
      .then((result) => {
        if (result.refreshToken && result.accessToken) {
          done(result.accessToken);
          return;
        }
        done(null);
      })
      .catch((err) => {
        console.error(err);
        done(null);
      });
  },
});

const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
  const token: string = configs?.token
    ? configs?.token
    : ((await TokenManager.getToken()) as string);

  return request(suffixUrl, injectBearer(token, configs));
};

export { request, privateRequest, TokenManager };
