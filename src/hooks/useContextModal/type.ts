import { ReactNode } from 'react';

import {
  ButtonProps,
  ModalContentProps,
  ModalProps,
  TextProps,
} from '@chakra-ui/react';

export interface ModalButtonProps {
  text: string;
  onPress?: () => void;
  buttonStyle?: ButtonProps;
  isCancel?: boolean;
}

export interface ContextModalProps {
  onClose: (modalId?: string) => void;
  modalKey?: string;

  title?: string;
  content?: ReactNode;
  buttons?: ModalButtonProps[];

  modalProps?: Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>;
  modalContentProps?: ModalContentProps;
  titleProps?: TextProps;
  contentProps?: TextProps;

  canCloseOverlay?: boolean;
  component?: ReactNode;
}

export interface OpenModalProps extends Omit<ContextModalProps, 'onClose'> {}

export type ModalContextType = {
  open: (props: OpenModalProps) => void;
  close: (ModalKey?: string) => void;
};
