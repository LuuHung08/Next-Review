import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import MainLayout from 'src/layout/MainLayout';
const Login = dynamic(() => import('@layout/Auth/Login'));

const SignInPage = () => {
  return (
    <>
      <MainLayout>
        <Login />
      </MainLayout>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['login'])),
      // Will be passed to the page component as props
    },
  };
}

export default SignInPage;
