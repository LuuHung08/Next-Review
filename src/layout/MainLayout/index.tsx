import dynamic from 'next/dynamic';

const MainHeader = dynamic(() => import('../components/MainHeader'));

const Footer = dynamic(() => import('../components/Footer'));

import style from './main.module.scss';

const MainLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />
      <main className={style.mainLayout}>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
