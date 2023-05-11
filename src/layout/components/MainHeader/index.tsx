import React from 'react';
import style from './main-header.module.scss';
import Image from 'next/image';
import Button from '@components/Button';
import { useTranslation } from 'next-i18next';
import Language from './Language';

const Header = () => {
  const { t } = useTranslation('login');
  return (
    <header>
      <div className={style.mainHeader}>
        <Image src='/static/images/logo-user.png' width={45} height={45} alt='logo-user' />
        <>
          <Language />
          <Button type='submit' text={t('login_title')} />
        </>
      </div>
    </header>
  );
};

export default Header;
