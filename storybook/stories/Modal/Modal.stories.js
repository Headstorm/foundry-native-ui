import React, { useState } from 'react';

import { ImageBackground } from 'react-native';

import styled from 'styled-components/native';

import { boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import colors from '../../../src/enums/colors';
import variants from '../../../src/enums/variants';
import Modal from '../../../src/components/Modal';
import Button from '../../../src/components/Button';
import Card from '../../../src/components/Card';

const StyledButtonContainer = styled(Button.Container)`
  align-self: flex-start;
`;

const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    action('close')();
  };

  const handlePressOutside = boolean('onPressOutside function', true) ? handleClose : undefined;

  const buttonAttachment = select(
    'closeButtonAttachment',
    ['inside', 'outside', 'corner'],
    'inside',
  );

  return (
    <>
      <Card elevation={1} header="Use this button to open the modal again">
        <Button
          color={colors.primaryDark}
          variant={variants.fill}
          onPress={() => {
            setIsOpen(true);
            action('open')();
          }}
          StyledContainer={StyledButtonContainer}
        >
          Open modal
        </Button>
      </Card>
      {isOpen && (
        <Modal
          closeButtonAttachment={buttonAttachment}
          backgroundDarkness={select('backgroundDarkness', ['default', 'light', 'dark'], 'dark')}
          backgroundBlur={number('backgroundBlur', 0.5, {
            range: true,
            min: 0,
            max: 5,
            step: 0.1,
          })}
          onPressOutside={handlePressOutside}
          onClose={handleClose}
          StyledContainer={StyledModalContainer}
        >
          <Card
            header="Hello world!"
            footer={
              <Button color={colors.primaryDark} onPress={handleClose}>
                Okay...
              </Button>
            }
            elevation={1}
          >
            The content of the modal (the card and everything inside it) is customizable. The close
            &times; is built-in but can be easily overwritten. It is the very model of a modern
            major React modal.
          </Card>
        </Modal>
      )}
    </>
  );
};

storiesOf('Modal', module)
  .addParameters({ component: Modal })
  .addDecorator(getStory => (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/weekly?landscape' }}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {getStory()}
    </ImageBackground>
  ))
  .add('Default', () => <DefaultModal />);
