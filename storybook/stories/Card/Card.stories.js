import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import CenterView from '../CenterView';

import Card from '../../../src/components/Card';

storiesOf('Card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => {
    return (
      <Card
        header={<Text>{text('header', 'Card title')}</Text>}
        footer={
          <Text>
            {text('footer', 'Actionable buttons, whatever other stuff you want to pass in!')}
          </Text>
        }
        elevation={number('elevation', 2, { range: true, min: -5, max: 5, step: 1 })}
        onPress={boolean('onPress', true) ? action('onPress') : undefined}
      >
        <Text>
          {text(
            'children',
            'A Hello, World! program generally is a computer program that outputs or displays the message Hello, World!.',
          )}
        </Text>
      </Card>
    );
  });
