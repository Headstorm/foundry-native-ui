import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import styled from 'styled-components';

import { remToPx } from '../../../src/utils/styles';

import colors from '../../../src/enums/colors';
import timings from '../../../src/enums/timings';

import { View } from '../../../src/baseElements';

import CenterView from '../CenterView';

import Card from '../../../src/components/Card';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => {
    return (
      <Card
        header={<Text>{text('card-header', 'Card title')}</Text>}
        footer={
          <Text>
            {text('card-footer', 'Actionable buttons, whatever other stuff you want to pass in!')}
          </Text>
        }
        elevation={number('elevation', 2, { range: true, min: -5, max: 5, step: 1 })}
        onPress={boolean('onPress', true) ? action('onPress') : undefined}
      >
        <Text>
          {text(
            'card-children',
            'A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!.',
          )}
        </Text>
      </Card>
    );
  })
  .add('Themed', () => {
    const themeColors = {
      ...colors,
      background: 'beige',
      primary: 'purple',
    };

    const themeTimings = {
      ...timings,
      xSlow: '2s',
    };

    const ThemedContainer = styled.View`
      ${({ elevation = 0 }) => `
        border-radius: ${remToPx(1)}px;
        background-color: ${themeColors.background};

        transform: scale(${elevation * 0.05 + 1});

        font-size: ${remToPx(1)}px;
        border: 1px solid ${themeColors.primary};
      `}
    `;

    const ThemedHeader = styled(View)`
      line-height: 0;
      font-size: ${remToPx(4)}px;
      padding-top: ${remToPx(2.5)}px;
      padding-left: ${remToPx(0.75)}px;
      padding-bottom: ${remToPx(1)}px;
      color: ${themeColors.primary};
    `;

    const ThemedFooter = styled(View)`
      border-style: solid;
      border-top-width: 1px;
      border-top-color: ${themeColors.primary};
    `;

    return (
      <Card
        StyledContainer={ThemedContainer}
        StyledHeader={ThemedHeader}
        StyledFooter={ThemedFooter}
        header={<Text>{text('card-themed-header', 'Card title')}</Text>}
        footer={
          <Text>
            {text('card-themed-footer', 'Actionable buttons, whatever other stuff you want to pass in!')}
          </Text>
        }
        elevation={number('elevation', 0, { range: true, min: -5, max: 5, step: 1 })}
        onPress={action('onPress')}
      >
        <Text>
          {text(
            'card-themed-children',
            'A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!.',
          )}
        </Text>
      </Card>
    );
  })
  .add('Ref', () => {
    const cardContainerRef = React.createRef();
    const cardHeaderRef = React.createRef();
    const cardBodyRef = React.createRef();
    const cardFooterRef = React.createRef();
    const interactiveFeedbackRef = React.createRef();
    const onPress = e => {
      e.preventDefault();
      action('onPress')(
        `container width x height: ${cardContainerRef.current?.clientWidth} x ${cardContainerRef.current?.clientHeight}
          header width x height: ${cardHeaderRef.current?.clientWidth} x ${cardHeaderRef.current?.clientHeight}
          body width x height: ${cardBodyRef.current?.clientWidth} x ${cardBodyRef.current?.clientHeight}
          footer width x height: ${cardFooterRef.current?.clientWidth} x ${cardFooterRef.current?.clientHeight}
          interactive width x height: ${interactiveFeedbackRef.current?.clientWidth} x ${interactiveFeedbackRef.current?.clientHeight}`,
      );
    };
    return (
      <Card
        header={<Text>{text('card-ref-header', 'View the Actions tab below')}</Text>}
        footer={
          <Text>
            {text(
              'card-ref-footer',
              'Try adjusting the width of the viewport. New clicks will return the updated dimensions for each element.',
            )}
          </Text>
        }
        elevation={number('elevation', 2, { range: true, min: -5, max: 5, step: 1 })}
        onPress={boolean('onPress', true) ? e => onPress(e) : undefined}
        containerRef={cardContainerRef}
        headerRef={cardHeaderRef}
        bodyRef={cardBodyRef}
        footerRef={cardFooterRef}
        interactiveFeedbackRef={interactiveFeedbackRef}
      >
        <Text>
          {text(
            'card-ref-children',
            'Then click anywhere on the Card to see the width/height of the child elements calculated via the Ref props!',
          )}
        </Text>
      </Card>
    );
  });
