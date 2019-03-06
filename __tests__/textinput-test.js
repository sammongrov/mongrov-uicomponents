import React from 'react';
import renderer from 'react-test-renderer';

import TextInput from '../TextInput';

it('Text renders correctly', () => {
  const tree = renderer.create(<TextInput> hello </TextInput>).toJSON();
  expect(tree).toMatchSnapshot();
});
