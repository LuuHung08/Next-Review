/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from 'ahooks';
import { useRecoilState } from 'recoil';
import { profileAtom, initialProfile } from './profile';
import { API_PATH } from 'src/apis/constant';
import { privateRequest, request } from 'src/apis/request';
export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileAtom);

  const requestGetProfile = useRequest(
    async (id?: number, callback?: () => void) => {
      if (id) {
        const profile = await privateRequest(request.get, API_PATH.USER(id));
        return profile;
      }
    },
    {
      manual: true,
      onSuccess: (r, params) => {
        const callback = params?.[1];
        if (!!r) {
          setProfile({
            ...profile,
            ...r,
            info: {
              ...r?.info,
            },
          });
          if (callback) callback();
        }
      },
      onError: () => {
        setProfile(initialProfile);
      },
    },
  );
  return {
    profile,
    setProfile,
    requestGetProfile,
  };
};
