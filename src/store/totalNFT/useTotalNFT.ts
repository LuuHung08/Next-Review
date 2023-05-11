import { useRecoilState } from 'recoil';
import { totalNFTAtom } from './totalNFT';

export const useTotalNFT = () => {
  const [totalNFT, setTotalNFT] = useRecoilState(totalNFTAtom);
  return {
    totalNFT,
    setTotalNFT
  };
};
