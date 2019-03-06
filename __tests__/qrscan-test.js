import React from 'react';
import renderer from 'react-test-renderer';
import QRScan from '../QRScan';

it('Badge renders correctly', () => {
  const tree = renderer.create(<QRScan />).toJSON();
  expect(tree).toMatchSnapshot();
});
