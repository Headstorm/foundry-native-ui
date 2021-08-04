import React from 'react';
import { PressableAndroidRippleConfig, Rect } from 'react-native';
// import UnstyledIcon from '@mdi/react';
// import { mdiLoading } from '@mdi/js';
import styled, { StyledComponentBase } from 'styled-components/native';
import { darken } from 'polished';

import { isIos } from '../../utils/platform';
import { remToPx } from '../../utils/styles';

import timings from '../../enums/timings';
import { FoundryContextType, useTheme } from '../../context';
import variants from '../../enums/variants';
// import Progress from '../Progress/Progress';
import { View, Button as ButtonElement, Text } from '../../baseElements';
import {
  getFontColorFromVariant,
  getBackgroundColorFromVariant,
  disabledStyles,
} from '../../utils/color';
import { SubcomponentPropsType } from '../commonTypes';
import { getShadowStyle } from '../../utils/styles';
// import InteractionFeedback from '../InteractionFeedback';
// import { InteractionFeedbackProps } from '../InteractionFeedback/InteractionFeedback';
import FeedbackTypes from '../../enums/feedbackTypes';
import UnstyledIcon from '../Icon';
import { mdiLoading } from '@mdi/js';

export type ButtonContainerProps = {
  theme: FoundryContextType;
  elevation: number;
  color: string;
  variant: variants;
  type: string;
  disabled: boolean;
  feedbackType: FeedbackTypes;
};

export enum ButtonTypes {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export type ButtonProps = {
  StyledContainer?: string & StyledComponentBase<any, {}, ButtonContainerProps>;
  StyledLeftIconContainer?: StyledComponentBase<any, {}>;
  StyledRightIconContainer?: StyledComponentBase<any, {}>;
  containerProps?: SubcomponentPropsType;
  iconPrefix?: string | JSX.Element;
  iconSuffix?: string | JSX.Element;
  isLoading?: boolean;
  isProcessing?: boolean;
  children?: string;
  elevation?: number;
  variant?: variants;
  type?: ButtonTypes;
  color?: string;
  feedbackType?: FeedbackTypes;
  hitSlop?: Rect | number;
  android_ripple?: PressableAndroidRippleConfig;
  disabled?: boolean;
  onPress: (...args: any[]) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  LoadingBar?: string & StyledComponentBase<any, {}>;
  id?: string;
  containerRef?: React.RefObject<HTMLButtonElement>;
  leftIconContainerRef?: React.RefObject<HTMLDivElement>;
  rightIconContainerRef?: React.RefObject<HTMLDivElement>;
  loadingBarRef?: React.RefObject<HTMLDivElement>;
};

export const ButtonContainer: string & StyledComponentBase<any, {}, ButtonContainerProps> = styled(
  ButtonElement,
)`
  ${({ theme, disabled, elevation = 0, color, variant, feedbackType }: ButtonContainerProps) => {
    const { colors, scale } = theme;
    const backgroundColor = getBackgroundColorFromVariant(
      variant,
      color,
      colors.transparent,
      disabled,
    );
    const fontColor = getFontColorFromVariant(
      variant,
      color,
      colors.background,
      colors.grayDark,
      disabled,
    );

    return `
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      font-size: ${remToPx(1, scale)}px;
      padding: ${remToPx(0.75, scale)}px ${remToPx(1, scale)}px;
      border-radius: ${remToPx(0.25, scale)}px;
      ${getShadowStyle(elevation, '#000000')}
      border: ${variant === variants.outline ? `1px solid ${color || '#121212'}` : '0'};
      border-width: 0px;
      color: ${fontColor};
      background-color: ${backgroundColor} !important;
      &:hover {
        background-color: darkred;
      }
    `;
  }}
`;

/* const StyledProgress = styled(Progress)`
  width: 5rem;
  height: 10px;
  margin-top: -5px;
  margin-bottom: -5px;
`; */

const IconContainer = styled(View)`
  height: ${remToPx(1)}px;
`;

const LeftIconContainer = styled(IconContainer)`
  ${({ hasContent }: { hasContent: boolean }) => `
    ${hasContent ? `margin-right: ${remToPx(0.75)}px;` : ''}
  `}
`;

const RightIconContainer = styled(IconContainer)`
  ${({ hasContent }: { hasContent: boolean }) => `
    ${hasContent ? `margin-left: ${remToPx(0.75)}px;` : ''}
  `}
`;

const Button = ({
  StyledContainer = ButtonContainer,
  StyledLeftIconContainer = LeftIconContainer,
  StyledRightIconContainer = RightIconContainer,
  containerProps = {},
  iconPrefix,
  iconSuffix,
  isLoading,
  isProcessing,
  children,
  elevation = 0,
  hitSlop = 6,
  android_ripple,
  variant = isIos ? variants.text : variants.fill,
  type = ButtonTypes.button,
  color,
  disabled = false,
  onPress,
  onMouseDown = () => {},
  onMouseUp = () => {},
  // LoadingBar = StyledProgress,
  id,
  containerRef,
  leftIconContainerRef,
  rightIconContainerRef,
  loadingBarRef,
}: ButtonProps): JSX.Element | null => {
  const hasContent = Boolean(children);
  // TODO: fix hooks breaking in subcomponent styles to avoid passing the theme as a prop to every subcomponent
  const theme = useTheme();
  const containerColor = color || '#eeeeee';
  const fontColor = getFontColorFromVariant(
    variant,
    containerColor,
    theme.colors.background,
    theme.colors.grayDark,
  );
  const rippleConfig = {
    color: fontColor,
    radius: 60,
    ...android_ripple,
  };

  // get everything we expose + anything consumer wants to send to container
  const mergedContainerProps = {
    'data-test-id': 'hsui-button',
    id,
    onPress,
    onMouseDown,
    onMouseUp,
    elevation,
    color: containerColor,
    variant,
    type,
    disabled,
    android_ripple: rippleConfig,
    hitSlop,
    theme,
    ...containerProps,
  };

  const { colors, scale } = theme;

  const buttonContent = isLoading ? (
    // <LoadingBar ref={loadingBarRef} />
    <View />
  ) : (
    <>
      {!isProcessing &&
        iconPrefix &&
        (typeof iconPrefix === 'string' && iconPrefix !== '' ? (
          <StyledLeftIconContainer hasContent={hasContent} ref={leftIconContainerRef}>
            <UnstyledIcon path={iconPrefix} size={`${remToPx(1, scale)}px`} />
          </StyledLeftIconContainer>
        ) : (
          <StyledLeftIconContainer ref={leftIconContainerRef}>{iconPrefix}</StyledLeftIconContainer>
        ))}
      {isProcessing && (
        <StyledLeftIconContainer hasContent={hasContent} ref={leftIconContainerRef}>
          <UnstyledIcon path={mdiLoading} size={`${remToPx(1, scale)}px`} spin={1} />
        </StyledLeftIconContainer>
      )}
      {/* // TODO: make Text an exported subcomponent */}
      <Text style={{ color: fontColor }}>{children}</Text>
      {iconSuffix &&
        (typeof iconSuffix === 'string' ? (
          <StyledRightIconContainer hasContent={hasContent} ref={rightIconContainerRef}>
            <UnstyledIcon path={iconSuffix} size={`${remToPx(1, scale)}px`} />
          </StyledRightIconContainer>
        ) : (
          <StyledRightIconContainer hasContent={hasContent} ref={rightIconContainerRef}>
            {iconSuffix}
          </StyledRightIconContainer>
        ))}
    </>
  );

  return (
    <StyledContainer ref={containerRef} {...mergedContainerProps}>
      {buttonContent}
    </StyledContainer>
  );
};

Button.Container = ButtonContainer;
Button.ButtonTypes = ButtonTypes;
// Button.LoadingBar = StyledProgress;
Button.LeftIconContainer = LeftIconContainer;
Button.RightIconContainer = RightIconContainer;

export default Button;
