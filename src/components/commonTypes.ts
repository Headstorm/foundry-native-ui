import { StyledComponentBase } from 'styled-components/native';

export type SubcomponentPropsType = Record<string, unknown>;

export type SubcomponentProperties = {
  component?: StyledComponentBase<any, {}>;
  props?: SubcomponentPropsType;
  ref?: React.RefObject<any>;
};