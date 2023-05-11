import React from 'react';
import style from './main-header.module.scss';
import Image from 'next/image';
import Button from '@components/Button';
import { useTranslation } from 'next-i18next';
import Language from './Language';
import { ROUTE_PATH } from '@constant/index';
import CustomLink from '@components/CustomLink';
import { useRouter } from 'next/router';

const Header = () => {
  const { t } = useTranslation(['home', 'login']);
  const router = useRouter();

  return (
    <header>
      <div className={style.mainHeader}>
        <Image src='/static/images/logo-user.png' width={45} height={45} alt='logo-user' />
        <>
          <Language />
          {router.pathname === ROUTE_PATH.SIGN_IN ? (
            <Button
              type='submit'
              text={<CustomLink href={ROUTE_PATH.HOME}>{t('home.title')}</CustomLink>}
            />
          ) : (
            <Button
              type='submit'
              text={<CustomLink href={ROUTE_PATH.SIGN_IN}>{t('login_title')}</CustomLink>}
            />
          )}
        </>
      </div>
    </header>
  );
};

export default Header;
