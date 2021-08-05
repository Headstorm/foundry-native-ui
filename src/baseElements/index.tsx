import styled from 'styled-components/native';
// import { animated } from 'react-spring';
import { withGlobalStyle } from '../context';

// Use these elements over native styled.xx elements, as they apply
// sensible defaults for each element. If an element doesn't exist, add it to this block
export const View = withGlobalStyle(styled.View``);
export const Text = withGlobalStyle(styled.Text``);
export const Button = withGlobalStyle(styled.Pressable``); // TODO: investigate the accessibility impacts of this
/* export const Input = withGlobalStyle(styledHtml.input``);
export const Label = withGlobalStyle(styledHtml.label``);
export const HR = withGlobalStyle(styledHtml.hr``);
export const Table = withGlobalStyle(styledHtml.table``);
export const TH = withGlobalStyle(styledHtml.th``);
export const TD = withGlobalStyle(styledHtml.td``);
export const TR = withGlobalStyle(styledHtml.tr``);
export const TextArea = withGlobalStyle(styledHtml.textarea``);

export const AnimatedDiv = withGlobalStyle(styled(animated.div)``);
export const AnimatedSpan = withGlobalStyle(styled(animated.span)``); */
