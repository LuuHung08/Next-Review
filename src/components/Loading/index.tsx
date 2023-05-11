import React from 'react';

import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={16}
        height={16}
        viewBox='0 0 16 16'
        fill='none'
      >
        <path
          d='M8 1.33325L8 3.33325'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 12.6665L8 14.6665'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.666 8L12.666 8'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3.33301 8L1.33301 8'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.714 3.28598L11.2998 4.7002'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.69937 11.2999L3.28516 12.7141'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3.28598 3.28598L4.7002 4.7002'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M11.2997 11.2999L12.7139 12.7141'
          stroke='#3E7BFA'
          strokeWidth='1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

export default Loading;
