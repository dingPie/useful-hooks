import {
  PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useState,
} from 'react';

import ContextModal from './ContextModal';
import { ModalContextType, OpenModalProps } from './type';

// context 생성
export const ContextModalContext = createContext<ModalContextType>({
  open: () => null,
  close: () => null,
});

const ContextModalProvider = ({ children }: PropsWithChildren) => {
  const [ModalState, setModalState] = useState<OpenModalProps | undefined>(
    undefined,
  );

  const onOpenModal = useCallback((currentSheet: OpenModalProps) => {
    setModalState(currentSheet);
  }, []);

  const onCloseModal = useCallback(() => {
    setModalState(undefined);
  }, []);

  return (
    <ContextModalContext.Provider
      value={{ open: onOpenModal, close: onCloseModal }}
    >
      {children}
      {ModalState && <ContextModal {...ModalState} onClose={onCloseModal} />}
    </ContextModalContext.Provider>
  );
};

export default memo(ContextModalProvider);
