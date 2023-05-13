import React from 'react';
import style from './main-header.module.scss';
import Image from 'next/image';
import Button from '@components/Button';
import { useTranslation } from 'next-i18next';
import Language from './Language';
import { ROUTE_PATH } from '@constant/index';
import CustomLink from '@components/CustomLink';
import { useRouter } from 'next/router';
import { useAuth } from '@store/auth/useAuth';

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { onLogout } = useAuth();

  const handleSubmitLogout = () => {
    onLogout();
  };

  return (
    <header className={style.mainHeader}>
      <Image src='/static/images/logo-user.png' width={45} height={45} alt='logo-user' />
      <>
        <Language />
        {router.pathname === ROUTE_PATH.SIGN_IN ? (
          <Button
            type='submit'
            text={<CustomLink href={ROUTE_PATH.HOME}>{t('home.title')}</CustomLink>}
          />
        ) : (
          <Button type='submit' text={t('logout_title')} handleSubmit={handleSubmitLogout} />
        )}
      </>
    </header>
  );
};

export default Header;
