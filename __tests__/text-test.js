import React from 'react';
import renderer from 'react-test-renderer';
// import { Alert } from 'react-native';
import Text from '../Text';

// const onHelpPress = () => Alert.alert('Help');

it('Text renders correctly', () => {
  const tree = renderer.create(<Text> hello </Text>).toJSON();
  expect(tree).toMatchSnapshot();
});
