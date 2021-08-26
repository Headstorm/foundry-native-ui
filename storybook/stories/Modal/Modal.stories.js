import React, { useState } from 'react';

import { ImageBackground } from 'react-native';

import { boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';

import colors from '../../../src/enums/colors';
import Modal from '../../../src/components/Modal';
import Button from '../../../src/components/Button';
import Card from '../../../src/components/Card';

const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    action('close')();
  };

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
          StyledContainer={Button.Container}
          onClick={() => setIsOpen(true)}
        >
          Open modal
        </Button>
      </Card>
      {isOpen && (
        <Modal
          closeButtonAttachment={buttonAttachment}
          backgroundDarkness={number('backgroundDarkness', 0.5, {
            range: true,
            min: 0,
            max: 1,
            step: 0.05,
          })}
          backgroundBlur={`${number('backgroundBlur', 0.5, {
            range: true,
            min: 0,
            max: 5,
            step: 0.1,
          })}rem`}
          onClickOutside={boolean('onClickOutside function', true) ? handleClose : undefined}
          onClose={handleClose}
        >
          <Card
            header="Hello world!"
            footer={
              <Button color={colors.primaryDark} onClick={handleClose}>
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
