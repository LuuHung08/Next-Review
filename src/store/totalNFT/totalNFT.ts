import { atom } from 'recoil';
import { ENV } from '@utils/env';

interface ITotalNFT {
  total: number;
}

let initTotalNFT: ITotalNFT = {
   total: 0
};

export const totalNFTAtom = atom({
  key: `${ENV.LOCAL_STORAGE_KEY}_TOTAL_NFT`,
  default: {
    ...initTotalNFT,
  },
});
