import React from 'react';
import renderer from 'react-test-renderer';
// import { Alert } from 'react-native';
import Screen from '../Screen';

// const onHelpPress = () => Alert.alert('Help');

it('Screen renders correctly', () => {
  const tree = renderer.create(<Screen> hello </Screen>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('name', () => {
  // array
  expect(Array.isArray(['value'])).toBe(true);
});
