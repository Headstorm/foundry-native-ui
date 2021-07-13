import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Progress from '../../../src/components/Progress';

// Once we have a design, we can use this block to set it
// const design = {
//   type: 'figma',
//   url: '',
// };

storiesOf('Progress', module)
  .addParameters({ component: Progress })
  .add(
    'Basic Progress',
    () => <Progress />,
    // { design }, Once we have a design for Progress we can link it here
  );
