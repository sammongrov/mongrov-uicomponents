// import React from 'react';
// import renderer from 'react-test-renderer';
// // import { Alert } from 'react-native';
// import Avatar from '../Avatar';

// it('Avatar renders correctly', () => {
//   const tree = renderer.create(<Avatar statusColor="red" avatarUrl="url" />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert, Image } from 'react-native';
import AppUtils from '@mongrov/utils';
import Avatar from '../Avatar';

const mockMath = global.Math;
mockMath.random = () => 0.5;
global.Math = mockMath;

configure({ adapter: new Adapter() });
const avatarInitials = () => Alert.alert('message');

it('Avatar renders correctly', () => {
  const tree = renderer.create(<Avatar avatarBgColor={AppUtils.getRandomColor()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('messageCount Component using shallow renders correctly', () => {
  const wrapper = shallow(<Avatar avatarUrl="url" avatarInitials={avatarInitials} />);
  expect(wrapper.instance().props.avatarInitials).toBeTruthy();
});

test('onError props test', () => {
  const wrapper = shallow(<Avatar avatarUrl="url" avatarInitials={avatarInitials} />);
  wrapper
    .find(Image)
    .first()
    .props()
    .onError();
  expect(wrapper.instance().state.urlErr).toBeTruthy();
});

test('statusColor props test', () => {
  const wrapper = shallow(<Avatar statusColor="green" />);
  expect(wrapper.instance().props.statusColor).not.toBeNull();
});
