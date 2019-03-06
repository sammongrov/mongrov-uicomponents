import React from 'react';
import renderer from 'react-test-renderer';
import QRCodeGenerator from '../QRCodeGenerator';

it('Badge renders correctly', () => {
  const tree = renderer.create(<QRCodeGenerator />).toJSON();
  expect(tree).toMatchSnapshot();
});
