import React from 'react';
import Image from 'next/image';
import style from './formAuth.module.scss';
import Button from '@components/Button';
import { useTranslation } from 'next-i18next';

export interface FormAuthProps {
  valLogin: {
    username: string;
    password: string;
    isErrorUserName: string;
    isErrorPassword: string;
  };
  isLoading: boolean;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleKeyPress: (...args: any[]) => void;
}

function FormAuth(props: FormAuthProps) {
  const { t } = useTranslation('login');
  const { valLogin, handleChangeUserName, handleSubmit, handleKeyPress, isLoading } = props;
  const { username, isErrorUserName } = valLogin;

  return (
    <div className={`${style.mainLogin}`}>
      <div className={`${style.formAuth}`}>
        <div className={style.logoLogin}>
          <Image src='/static/images/logo-user.png' width={45} height={45} alt='logo-user' />
        </div>
        <h4 className='text-center'>{t('login_title')}</h4>
        <div className={style.formTitle}>
          <div>{t('login_account')}</div>
          <div className={style.formLogin}>
            <input
              className={style.formInput}
              type='text'
              name='username'
              placeholder={t('login_input_account')}
              value={username}
              onChange={handleChangeUserName}
              onKeyDown={handleKeyPress}
            />
            <div className='text-err'>{isErrorUserName}</div>

            <div className={style.formIcon}>
              <Image src='/static/icons/Profile_login.svg' width={16} height={20} alt='user-name' />
            </div>
          </div>
        </div>
        {/* <div className={style.formTitle}>
          <div>{t('login_pass')}</div>
          <div className={style.formLogin}>
            <input
              className={style.formInput}
              type={isShowPass ? 'text' : 'password'}
              placeholder={t('login_input_pass')}
              value={password}
              name='pass'
              onChange={handleChangeUserName}
              onKeyDown={handleKeyPress}
            />
            <div className='text-err'>{isErrorPassword}</div>
            <div className={style.formIcon}>
              <Image src='/static/icons/Lock.svg' width={16} height={20} alt='pass-word' />
            </div>

            {isShowPass ? (
              <div
                className={style.formIconHidePass}
                onClick={() => setShow({ ...show, isShowPass: false })}
              >
                <ShowPass />
              </div>
            ) : (
              <div
                className={style.formIconHidePass}
                onClick={() => setShow({ ...show, isShowPass: true })}
              >
                <HidePass />
              </div>
            )}
          </div>
        </div> */}
        <div className={style.buttonLogin}>
          <Button
            isDisabled={username === '' || isErrorUserName !== '' || isLoading}
            isLoading={isLoading}
            text={t('login_title')}
            handleSubmit={handleSubmit}
            type='submit'
          />
        </div>
      </div>
    </div>
  );
}

export default FormAuth;
