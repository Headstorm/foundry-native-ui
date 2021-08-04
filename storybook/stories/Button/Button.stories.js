import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { boolean, color, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import colors from '../../../src/enums/colors';
import variants from '../../../src/enums/variants';
import Button from '../../../src/components/Button';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Basic Button', () => (
    <Button
      variant={select('variant', variants, variants.fill)}
      color={color('color', colors.primaryDark)}
      onPress={action('button-press')}
      disabled={boolean('disabled', false)}
      iconPrefix="message"
      iconSuffix="send"
      isProcessing
    >
      <Text>{text('children', 'Default text')}</Text>
    </Button>
  ));
