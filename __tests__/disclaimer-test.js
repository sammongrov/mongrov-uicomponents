import React from 'react';
import { Alert } from 'react-native';

import renderer from 'react-test-renderer';
import Disclaimer from '../Disclaimer';

const onAccept = () => Alert.alert('Accepted');

it('Disclaimer renders correctly', () => {
  const tree = renderer
    .create(<Disclaimer onAccept={onAccept} content="Disclaimer is agreed" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
