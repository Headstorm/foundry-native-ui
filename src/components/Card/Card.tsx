import React, { ReactNode } from 'react';
import styled, { StyledComponentBase } from 'styled-components';

import { Button, View } from '../../baseElements';
import { SubcomponentPropsType } from '../commonTypes';
import { FoundryContextType, useTheme } from '../../context';

import { remToPx, getShadowStyle } from '../../utils/styles';

import FeedbackTypes from '../../enums/feedbackTypes';

const defaultOnPress = () => {};

export type CardContainerProps = {
  elevation: number;
  feedbackType: FeedbackTypes;
  onPress: (...args: any[]) => void;
  theme: FoundryContextType;
};

export const CardContainer = styled(Button)`
  ${({ elevation, feedbackType, onPress, theme }: CardContainerProps) => {
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
    const { colors, scale } = theme;

    return `
      padding: ${remToPx(1.5, scale)}px ${remToPx(1.5, scale)}px ${
      hasBody || hasFooter ? `${remToPx(0, scale)}px` : ''
    };
      border-top-left-radius: ${remToPx(0.25, scale)}px;
      border-top-right-radius: ${remToPx(0.25, scale)}px;
      border-bottom-right-radius: ${remToPx(0, scale)}px;
      border-bottom-left-radius: ${remToPx(0, scale)}px;
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
    const { colors, scale } = theme;

    return `
      padding: ${remToPx(1.5, scale)}px ${remToPx(1.5, scale)}px;
      color: ${colors.grayMedium};
    `;
  }}
`;

export const Footer = styled(View)`
  ${({ theme }) => {
    const { colors, scale } = theme;

    return `
      padding: ${remToPx(1, scale)}px ${remToPx(1.5, scale)}px;
      display: flex;
      flex-flow: row wrap;

      justify-content: flex-end;

      color: ${colors.grayLight};

      border-top-left-radius: ${remToPx(0, scale)}px;
      border-top-right-radius: ${remToPx(0, scale)}px;
      border-bottom-right-radius: ${remToPx(0.25, scale)}px;
      border-bottom-left-radius: ${remToPx(0.25, scale)}px;
    `;
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
  disableFeedback?: boolean;
  feedbackType?: FeedbackTypes;

  containerRef?: React.RefObject<HTMLDivElement>;
  headerRef?: React.RefObject<HTMLDivElement>;
  bodyRef?: React.RefObject<HTMLDivElement>;
  footerRef?: React.RefObject<HTMLDivElement>;
  interactiveFeedbackRef?: React.RefObject<HTMLDivElement>;

  theme: FoundryContextType;
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
  interactionFeedbackProps,

  containerRef,
  headerRef,
  bodyRef,
  footerRef,
  interactiveFeedbackRef,

  onPress = defaultOnPress,

  header,
  children,
  footer,

  elevation = 1,
  feedbackType = FeedbackTypes.ripple,
}: CardProps): JSX.Element | null => {
  const hasHeader = Boolean(header);
  const hasBody = Boolean(children);
  const hasFooter = Boolean(footer);

  const theme = useTheme();

  return (
    <StyledContainer
      onPress={onPress}
      elevation={elevation}
      feedbackType={feedbackType}
      theme={theme}
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
          {header}
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
          {children}
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
          {footer}
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
