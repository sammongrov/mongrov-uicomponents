import React from 'react';
import renderer from 'react-test-renderer';
import CapitalizeText from '../CapitalizeText';

it('Badge renders correctly', () => {
  const tree = renderer.create(<CapitalizeText text="children" />).toJSON();
  expect(tree).toMatchSnapshot();
});
