import React, { useContext } from 'react';
import styled, { StyledComponentBase } from 'styled-components';
import fonts from '../enums/fonts';
import colorsEnum from '../enums/colors';

export const defaultGlobalStyles = `
  ${
    process.env.NODE_ENV === 'test'
      ? ''
      : `
          ${fonts.importFonts}
          ${fonts.body}
        `
  }
`;

const defaultScaleFactor = 1;

type FoundryColorsType = Record<keyof typeof colorsEnum, string>;
export type FoundryContextType = {
  globalStyles: string;
  colors: FoundryColorsType;
  scale: number
};
const defaultContextValue = {
  globalStyles: defaultGlobalStyles,
  colors: colorsEnum,
  scale: defaultScaleFactor
  // TODO Add Foundry's "theme" to items here and pull from the ContextProvider
};
export const FoundryContext = React.createContext<FoundryContextType>(defaultContextValue);

export const FoundryProvider = ({
  value = defaultContextValue,
  children,
}: {
  value?: { globalStyles?: string; colors?: Partial<Record<keyof typeof colorsEnum, string>>, scale?: number};
  children: React.ReactNode;
}) => {
  const { globalStyles = defaultGlobalStyles, colors = colorsEnum, scale = defaultScaleFactor } = value;

  // use the default set of styles, unless we've got something to override
  const mergedStyles =
    globalStyles === defaultGlobalStyles
      ? globalStyles
      : `
    ${defaultGlobalStyles}
    ${globalStyles}
  `;
  const mergedColors = {
    ...colorsEnum,
    ...colors,
  };
  return (
    <FoundryContext.Provider value={{ globalStyles: mergedStyles, colors: mergedColors, scale: scale }}>
      {children}
    </FoundryContext.Provider>
  );
};

export function useTheme(): FoundryContextType {
  const theme = useContext(FoundryContext);
  return theme;
}

export const withGlobalStyle = (Component: string & StyledComponentBase<any, {}>) => {
  const ComponentWithGlobalStyles = styled(Component)`
    ${props => {
      return props.globalStyles;
    }}
  `;

  return React.forwardRef((props: any, ref: any) => {
    const { globalStyles } = useContext(FoundryContext);
    return <ComponentWithGlobalStyles globalStyles={globalStyles} {...props} ref={ref} />;
  });
};
