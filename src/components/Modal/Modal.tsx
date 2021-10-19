import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

import { BlurTint, BlurView } from 'expo-blur';
import { BlurTint, BlurView as BlurViewBase } from 'expo-blur';

import { View, Button, Modal as NativeModal } from '../../baseElements';
import { SubcomponentPropsType, StyledSubcomponentType } from '../commonTypes';

const defaultOnClick = () => {};

const Underlay = styled(Button)`
  height: 100%;
  width: 100%;
`;

const BlurView = styled(BlurViewBase)`
  height: 100%;
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
  StyledBlurView?: StyledSubcomponentType;
  StyledCloseButton?: StyledSubcomponentType;
  StyledCloseButtonContainer?: StyledSubcomponentType;

  containerProps?: SubcomponentPropsType;
  underlayProps?: SubcomponentPropsType;
  blurViewProps?: SubcomponentPropsType;
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
  StyledBlurView = BlurView,

  containerProps = {},
  underlayProps = {},
  blurViewProps = {},

  containerRef,
  underlayRef,

  animationType = 'fade',
  location = 'center',

  children,

  onPressOutside = defaultOnClick,
  onClose = defaultOnClick,

  backgroundBlur = 0.5,
  backgroundDarkness = 'default',
}: ModalProps): ReactElement => {
  const { styles: containerStyles }: { styles?: Record<string, unknown> } = containerProps;
  const { styles: underlayStyles }: { styles?: Record<string, unknown> } = underlayProps;
  const { styles: blurViewStyles }: { styles?: Record<string, unknown> } = blurViewProps;

  const blurIntensity = Math.round(backgroundBlur * 100);

  return (
    <NativeModal
      animationType="fade"
      visible
      transparent
      onRequestClose={onClose}
      hardwareAccelerated
    >
      {blurIntensity > 0 && (
        <StyledBlurView
          intensity={blurIntensity}
          tint={backgroundDarkness}
          {...blurViewProps}
          style={blurViewStyles}
        />
      )}
      <NativeModal
        animationType={animationType}
        visible
        transparent
        onRequestClose={onClose}
        onDismiss={onClose}
        hardwareAccelerated
      >
        <StyledUnderlay
          onPress={onPressOutside}
          ref={underlayRef}
          {...underlayProps}
          style={underlayStyles}
        >
          <StyledContainer
            ref={containerRef}
            {...containerProps}
            style={containerStyles}
            location={location}
          >
            {children}
          </StyledContainer>
        </StyledUnderlay>
      </NativeModal>
    </NativeModal>
  );
};

Modal.Underlay = Underlay;
Modal.BlurView = BlurView;
Modal.Container = Container;

export default Modal;