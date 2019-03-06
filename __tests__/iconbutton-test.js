import React from 'react';
import { Alert } from 'react-native';

import renderer from 'react-test-renderer';
import IconButton from '../IconButton';

const onPress = () => Alert.alert('Accepted');

it('IconButton renders correctly', () => {
  const tree = renderer.create(<IconButton onPress={onPress} />).toJSON();
  expect(tree).toMatchSnapshot();
});
