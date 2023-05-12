import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FormAuth from './FormAuth';
import { useLogin } from './services';
import { useAuth } from '@store/auth/useAuth';
import { initValLogin } from './type';
import { useTranslation } from 'next-i18next';

const Login = () => {
  const { t } = useTranslation('common');
  const { onLogin } = useAuth();
  const [valLogin, setValLogin] = useState(initValLogin);
  const { username, isErrorUserName } = valLogin;

  const requestSignInByEmail = useLogin({
    onSuccess: (r) => {
      if (!r?.accessToken) {
        toast.error('Tài khoản không chính xác', {
          theme: 'colored',
        });
        return;
      } else {
        onLogin({
          token: r?.accessToken || '',
          refreshToken: r?.refreshToken,
        });
        toast.success('Đăng nhập thành công', {
          theme: 'colored',
        });
      }
    },
    onError: () => {
      toast.error('Tài khoản không chính xác', {
        theme: 'colored',
      });
    },
  });
  const handleSubmit = () => {
    if (username !== '' && !isErrorUserName) {
      requestSignInByEmail.run({
        username: username,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === 'username') {
      if (value === '') {
        setValLogin((state) => ({
          ...state,
          isErrorUserName: t('login_input_account_please'),
        }));
      } else setValLogin((state) => ({ ...state, isErrorUserName: '' }));
      setValLogin((state) => ({ ...state, username: value }));
    } else {
      if (value === '') {
        setValLogin((state) => ({ ...state, isErrorPassword: t('login_input_pass_please') }));
      } else setValLogin((state) => ({ ...state, isErrorPassword: '' }));
      setValLogin((state) => ({ ...state, password: value }));
    }
  };

  return (
    <FormAuth
      isLoading={requestSignInByEmail.loading}
      valLogin={valLogin}
      handleSubmit={handleSubmit}
      handleChangeUserName={handleChangeUserName}
      handleKeyPress={handleKeyPress}
    />
  );
};

export default Login;
