import { ReactNode, memo } from 'react';

import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalProps,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';

interface ModalButtonProps {
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

  component?: ReactNode;
}
/**
 * chakra ui sample
 * P_TODO: 내부 스타일링 수정해야 함.
 */
const ContextModal = ({
  onClose,
  modalKey,

  title,
  content,
  buttons,

  titleProps,
  contentProps,
  modalContentProps,
  modalProps,

  component,
}: ContextModalProps) => {
  const isOpen = !!(title || component);
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(modalKey)} {...modalProps}>
      {component ? (
        component
      ) : (
        <ModalContent
          position="relative"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          {...modalContentProps}
        >
          <ModalBody>
            <VStack w="100%">
              {!!title && (
                <Text
                  size="pre-heading-03"
                  color="text-primary"
                  mb="2"
                  {...titleProps}
                >
                  {title}
                </Text>
              )}

              {!!content &&
                (typeof content === 'string' ? (
                  <Text
                    size="pre-body-02"
                    color="text-primary"
                    {...contentProps}
                  >
                    {content}
                  </Text>
                ) : (
                  content
                ))}
            </VStack>
          </ModalBody>

          <ModalFooter gap="8px">
            {/* 하단 버튼 */}
            {buttons?.map((button, idx) => (
              <Button
                key={idx + button?.text}
                size="lg"
                flex={1}
                variant={button.isCancel ? 'subtle' : 'solid'}
                onPress={
                  button.isCancel ? () => onClose(modalKey) : button.onPress
                }
                {...button.buttonStyle}
              >
                {button.text}
              </Button>
            ))}
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default memo(
  ContextModal,
  (prev, curr) =>
    (prev.title === curr.title &&
      prev.content === curr.content &&
      prev.buttons === curr.buttons) ||
    prev.component === curr.component,
);
