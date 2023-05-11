import React from 'react';
import style from './button.module.scss';
import Loading from '../Loading';
interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  text: string;
  handleSubmit?: React.MouseEventHandler<HTMLElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
  isCancel?: boolean;
}

function Button(props: ButtonProps) {
  const { text, handleSubmit, isLoading, isDisabled, isCancel, type } = props;
  return (
    <button
      onClick={handleSubmit}
      className={isCancel ? style.cancel : style.submit}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
      type={type}
    >
      <p>{text}</p>
      {isLoading && (
        <div className={style.loadingSpan}>
          <Loading />
        </div>
      )}
    </button>
  );
}

export default Button;
