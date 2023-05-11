import { useEffect } from 'react';

export function useCloseSpaceEsc(handleClosePopupOtp: () => void) {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        handleClosePopupOtp();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [handleClosePopupOtp]);
}
