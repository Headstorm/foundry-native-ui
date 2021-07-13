import React, { ReactNode, useState } from 'react';
import { Rect, PressableAndroidRippleConfig, LayoutChangeEvent } from 'react-native';

import styled, { StyledComponentBase } from 'styled-components';

import { Button, Text, View } from '../../baseElements';
import { SubcomponentPropsType } from '../commonTypes';
import { FoundryContextType, useTheme } from '../../context';

import { remToPx, getShadowStyle } from '../../utils/styles';

import colors from '../../enums/colors';

const defaultOnPress = () => {};

export type CardContainerProps = {
  elevation: number;
  onPress: (...args: any[]) => void;
  theme: FoundryContextType;
};

export const CardContainer = styled(Button)`
  ${({ elevation, theme }: CardContainerProps) => {
    const { colors, scale } = theme;

    return `
      display: flex;
      flex-flow: column nowrap;
      font-size: ${remToPx(1, scale)}px;
      border-radius: ${remToPx(0.25, scale)}px;
      border: ${!elevation ? `1px solid ${colors.grayXlight}` : '0px solid transparent'};
      ${getShadowStyle(elevation, colors.shadow)};
      background-color: ${colors.background};
  `;
  }}
`;

export const Header = styled(View)`
  ${({ hasBody, hasFooter, theme }) => {
    const { scale } = theme;

    return `
      padding: ${remToPx(1.5, scale)}px ${remToPx(1.5, scale)}px ${
      hasBody || hasFooter ? `${remToPx(0, scale)}px` : ''
    };
      border-top-left-radius: ${remToPx(0.25, scale)}px;
      border-top-right-radius: ${remToPx(0.25, scale)}px;
      border-bottom-right-radius: ${remToPx(0, scale)}px;
      border-bottom-left-radius: ${remToPx(0, scale)}px;
    `;
  }}
`;

export const HeaderText = styled(Text)`
  ${({ theme }) => {
    const { colors } = theme;

    return `
    font-weight: bold;
    color: ${colors.grayDark};
  `;
  }}
`;

export const NoPaddingHeader = styled(Header)`
  padding: 0;
  overflow: hidden;
`;

export const Body = styled(View)`
  ${({ theme }) => {
    const { scale } = theme;

    return `padding: ${remToPx(1.5, scale)}px ${remToPx(1.5, scale)}px;`;
  }}
`;

export const BodyText = styled(Text)`
  ${({ theme }) => {
    const { colors } = theme;

    return `color: ${colors.grayMedium};`;
  }}
`;

export const Footer = styled(View)`
  ${({ theme }) => {
    const { scale } = theme;

    return `
      padding: ${remToPx(1, scale)}px ${remToPx(1.5, scale)}px;
      display: flex;
      flex-flow: row wrap;

      justify-content: flex-end;

      border-top-left-radius: ${remToPx(0, scale)}px;
      border-top-right-radius: ${remToPx(0, scale)}px;
      border-bottom-right-radius: ${remToPx(0.25, scale)}px;
      border-bottom-left-radius: ${remToPx(0.25, scale)}px;
    `;
  }}
`;

export const FooterText = styled(Text)`
  ${({ theme }) => {
    const { colors } = theme;

    return `color: ${colors.grayLight};`;
  }}
`;

export interface CardProps {
  StyledContainer?: string & StyledComponentBase<any, {}>;
  StyledHeader?: string & StyledComponentBase<any, {}>;
  StyledBody?: string & StyledComponentBase<any, {}>;
  StyledFooter?: string & StyledComponentBase<any, {}>;

  containerProps?: SubcomponentPropsType;
  headerProps?: SubcomponentPropsType;
  bodyProps?: SubcomponentPropsType;
  footerProps?: SubcomponentPropsType;

  onPress?: (...args: any[]) => void;

  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  elevation?: number;
  hitSlop?: Rect | number;
  android_ripple?: PressableAndroidRippleConfig;
  disableFeedback?: boolean;

  containerRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
  bodyRef?: React.RefObject<HTMLDivElement>;
  footerRef?: React.RefObject<HTMLDivElement>;
}

const Card = ({
  StyledContainer = CardContainer,
  StyledHeader = Header,
  StyledBody = Body,
  StyledFooter = Footer,

  containerProps,
  headerProps,
  bodyProps,
  footerProps,

  containerRef,
  headerRef,
  bodyRef,
  footerRef,

  onPress = defaultOnPress,

  header,
  children,
  footer,

  elevation = 1,
  hitSlop = 6,
  android_ripple,
}: CardProps): JSX.Element | null => {
  const hasHeader = Boolean(header);
  const hasBody = Boolean(children);
  const hasFooter = Boolean(footer);

  const theme = useTheme();

  const [rippleRadius, setRippleRadius] = useState(100);

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setRippleRadius(Math.max(width, height) / 2);
  };

  const rippleConfig = {
    color: colors.grayDark25,
    radius: rippleRadius,
    borderLess: false,
    ...android_ripple,
  };

  if (typeof hitSlop === 'number') {
    hitSlop = { x: hitSlop, y: hitSlop };
  }

  return (
    <StyledContainer
      onPress={onPress}
      onLayout={handleLayoutChange}
      elevation={elevation}
      theme={theme}
      android_ripple={rippleConfig}
      hitSlop={hitSlop}
      {...containerProps}
      ref={containerRef}
    >
      {header && (
        <StyledHeader
          hasBody={hasBody}
          hasFooter={hasFooter}
          ref={headerRef}
          theme={theme}
          {...headerProps}
        >
          {typeof header === 'string' ? <HeaderText theme={theme}>{header}</HeaderText> : header}
        </StyledHeader>
      )}
      {children && (
        <StyledBody
          hasHeader={hasHeader}
          hasFooter={hasFooter}
          ref={bodyRef}
          theme={theme}
          {...bodyProps}
        >
          {typeof children === 'string' ? <BodyText theme={theme}>{children}</BodyText> : children}
        </StyledBody>
      )}
      {footer && (
        <StyledFooter
          hasHeader={hasHeader}
          hasBody={hasBody}
          ref={footerRef}
          theme={theme}
          {...footerProps}
        >
          {typeof footer === 'string' ? <FooterText theme={theme}>{footer}</FooterText> : footer}
        </StyledFooter>
      )}
    </StyledContainer>
  );
};

Card.Header = Header;
Card.NoPaddingHeader = NoPaddingHeader;
Card.Footer = Footer;
Card.Body = Body;
Card.Container = CardContainer;

export default Card;
