import React from 'react';
import renderer from 'react-test-renderer';
// import { Alert } from 'react-native';
import TabIcon from '../TabIcon';

it('TabIcon renders correctly', () => {
  const tree = renderer.create(<TabIcon iconName="wallet" />).toJSON();
  expect(tree).toMatchSnapshot();
});
