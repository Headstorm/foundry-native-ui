import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import styled from 'styled-components';

import { remToPx } from '../../../src/utils/styles';

import colors from '../../../src/enums/colors';

import { View, Text, Button } from '../../../src/baseElements';

import CenterView from '../CenterView';

import Card from '../../../src/components/Card';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => {
    return (
      <Card
        header={text('card-header', 'Card title')}
        footer={text(
          'card-footer',
          'Actionable buttons, whatever other stuff you want to pass in!',
        )}
        elevation={number('elevation', 2, { range: true, min: -5, max: 5, step: 1 })}
        onPress={boolean('onPress', true) ? action('onPress') : undefined}
      >
        {text(
          'card-children',
          'A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!.',
        )}
      </Card>
    );
  })
  .add('Themed', () => {
    const themeColors = {
      ...colors,
      background: 'beige',
      primary: 'purple',
    };

    const ThemedContainer = styled(Button)`
      border-radius: ${remToPx(1)}px;
      background-color: ${themeColors.background};
      border: 1px solid ${themeColors.primary};
    `;

    const ThemedBodyText = styled(Text)`
      font-size: ${remToPx(1)}px;
    `;

    const ThemedHeader = styled(View)`
      padding-left: ${remToPx(0.75)}px;
    `;

    const ThemedHeaderText = styled(Text)`
      font-size: ${remToPx(4)}px;
      color: ${themeColors.primary};
    `;

    const ThemedFooter = styled(View)`
      padding: ${remToPx(1)}px ${remToPx(1.5)}px;
      border-style: solid;
      border-top-width: 1px;
      border-top-color: ${themeColors.primary};
    `;

    return (
      <Card
        StyledContainer={ThemedContainer}
        StyledHeader={ThemedHeader}
        StyledFooter={ThemedFooter}
        header={<ThemedHeaderText>{text('card-themed-header', 'Card title')}</ThemedHeaderText>}
        footer={text(
          'card-themed-footer',
          'Actionable buttons, whatever other stuff you want to pass in!',
        )}
        elevation={number('elevation', 0, { range: true, min: -5, max: 5, step: 1 })}
        onPress={action('onPress')}
      >
        <ThemedBodyText>
          {text(
            'card-themed-children',
            'A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!.',
          )}
        </ThemedBodyText>
      </Card>
    );
  })
  .add('Ref', () => {
    const cardContainerRef = React.createRef();
    const cardHeaderRef = React.createRef();
    const cardBodyRef = React.createRef();
    const cardFooterRef = React.createRef();
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
        header={text('card-ref-header', 'View the Actions tab below')}
        footer={text(
          'card-ref-footer',
          'Try adjusting the width of the viewport. New clicks will return the updated dimensions for each element.',
        )}
        elevation={number('elevation', 2, { range: true, min: -5, max: 5, step: 1 })}
        onPress={boolean('onPress', true) ? e => onPress(e) : undefined}
        containerRef={cardContainerRef}
        headerRef={cardHeaderRef}
        bodyRef={cardBodyRef}
        footerRef={cardFooterRef}
      >
        {text(
          'card-ref-children',
          'Then click anywhere on the Card to see the width/height of the child elements calculated via the Ref props!',
        )}
      </Card>
    );
  });
