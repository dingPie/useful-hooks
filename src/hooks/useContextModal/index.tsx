import { useContext } from 'react';

import { ContextModalContext } from './ContextModalProvider';

const useContextModal = () => {
  const { close, open } = useContext(ContextModalContext);

  return {
    open,
    close,
  };
};
export default useContextModal;
