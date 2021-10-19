import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

import { BlurTint, BlurView } from 'expo-blur';
import { View, Button, Modal as NativeModal } from '../../baseElements';
import { SubcomponentPropsType, StyledSubcomponentType } from '../commonTypes';

const defaultOnClick = () => {};

const Underlay = styled(Button)`
  height: 100%;
  width: 100%;
`;

const Container = styled(View)<{ location: 'top' | 'center' | 'bottom' }>`
  display: flex;
  height: 100%;
  justify-content: ${({ location }) => {
    switch (location) {
      case 'top':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'bottom':
        return 'flex-end';
      default:
        return 'center';
    }
  }};
`;

export interface ModalProps {
  StyledContainer?: StyledSubcomponentType;
  StyledUnderlay?: StyledSubcomponentType;
  StyledCloseButton?: StyledSubcomponentType;
  StyledCloseButtonContainer?: StyledSubcomponentType;

  containerProps?: SubcomponentPropsType;
  underlayProps?: SubcomponentPropsType;
  closeButtonProps?: SubcomponentPropsType;
  closeButtonContainerProps?: SubcomponentPropsType;

  containerRef?: React.RefObject<HTMLDivElement>;
  closeButtonContainerRef?: React.RefObject<HTMLDivElement>;
  underlayRef?: React.RefObject<HTMLDivElement>;

  animationType?: 'none' | 'slide' | 'fade';
  location?: 'top' | 'center' | 'bottom';

  children: ReactNode;

  onPressOutside?: () => void;
  onClose?: () => void;

  closeButtonAttachment?: string;
  backgroundBlur?: number;
  backgroundDarkness?: BlurTint;
  style?: Record<string, unknown>;
}

const Modal = ({
  StyledContainer = Container,
  StyledUnderlay = Underlay,

  containerProps = {},
  underlayProps = {},

  containerRef,
  underlayRef,

  animationType = 'fade',
  location = 'center',

  children,

  onPressOutside = defaultOnClick,
  onClose = defaultOnClick,

  backgroundBlur = 0.5,
  backgroundDarkness = 'default',
}: ModalProps): JSX.Element => {
  const { styles: containerStyles }: { styles?: Record<string, unknown> } = containerProps;
  const { styles: underlayStyles }: { styles?: Record<string, unknown> } = underlayProps;

  return (
    <NativeModal
      ref={containerRef}
      {...containerProps}
      style={containerStyles}
      visible
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      onDismiss={onClose}
      hardwareAccelerated
    >
      <BlurView intensity={Math.round(backgroundBlur * 100)} tint={backgroundDarkness}>
        <StyledUnderlay
          onPress={onPressOutside}
          ref={underlayRef}
          {...underlayProps}
          style={underlayStyles}
        >
          <StyledContainer location={location}>{children}</StyledContainer>
        </StyledUnderlay>
      </BlurView>
    </NativeModal>
  );
};

Modal.Underlay = Underlay;
Modal.Container = Container;
export default Modal;
