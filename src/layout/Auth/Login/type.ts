export interface ShowProps {
  isShowPass: boolean;
  isLoading: boolean;
}

export interface ValLoginProps {
  username: string;
  password: string;
  isErrorUserName: string;
  isErrorPassword: string;
}

export const initShow: ShowProps = {
  isShowPass: false,
  isLoading: false,
};

export const initValLogin: ValLoginProps = {
  username: '',
  password: '',
  isErrorUserName: '',
  isErrorPassword: '',
};
