import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FormAuth from './FormAuth';
import { useLogin } from './services';
import { useAuth } from '@store/auth/useAuth';
import { initShow, initValLogin } from './type';

const Login = () => {
  const { onLogin } = useAuth();
  const [show, setShow] = useState(initShow);
  const [valLogin, setValLogin] = useState(initValLogin);
  const { username, password, isErrorUserName, isErrorPassword } = valLogin;

  const requestSignInByEmail = useLogin({
    onSuccess: (r) => {
      if (!r?.token) {
        return;
      } else {
        onLogin({
          id: r?.id,
          token: r?.token || '',
          expiredTime: r?.expired_time || 0,
          refreshToken: r?.refreshToken,
        });
        setShow({ ...show, isLoading: false });
      }
    },
    onError: () => {
      toast.error('Tài khoản hoặc mật khẩu không chính xác', {
        theme: 'colored',
      });
      setShow({ ...show, isLoading: false });
    },
  });
  const handleSubmit = () => {
    if (username !== '' && password !== '' && !isErrorUserName && !isErrorPassword) {
      setShow({ ...show, isLoading: true });
      setTimeout(() => {
        requestSignInByEmail.run({
          username: username,
          password: password || '',
        });
      }, 1000);
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
          isErrorUserName: 'Vui lòng nhập tài khoản',
        }));
      } else setValLogin((state) => ({ ...state, isErrorUserName: '' }));
      setValLogin((state) => ({ ...state, username: value }));
    } else {
      if (value === '') {
        setValLogin((state) => ({ ...state, isErrorPassword: 'Vui lòng nhập mật khẩu' }));
      } else setValLogin((state) => ({ ...state, isErrorPassword: '' }));
      setValLogin((state) => ({ ...state, password: value }));
    }
  };

  return (
    <FormAuth
      valLogin={valLogin}
      show={show}
      setShow={setShow}
      handleSubmit={handleSubmit}
      handleChangeUserName={handleChangeUserName}
      handleKeyPress={handleKeyPress}
    />
  );
};

export default Login;
