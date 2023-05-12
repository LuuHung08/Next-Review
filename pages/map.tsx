import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const Map = dynamic(() => import('@layout/Map'));

const SignInPage = () => {
  return (
    <MainLayout>
      <Map />
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default SignInPage;
