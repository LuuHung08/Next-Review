import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@components/Home';
import MainLayout from '@layout/MainLayout';
import { ReactElement } from 'react';

const HomePage = () => {
  return <Home />;
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
