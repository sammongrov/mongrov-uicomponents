import React from 'react';
import renderer from 'react-test-renderer';
import { Alert } from 'react-native';
import Button from '../Button';

const onPress = () => Alert.alert('press');

it('Button renders correctly', () => {
  const tree = renderer
    .create(<Button text="hello" activeOpacity={0.8} onPress={onPress} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
